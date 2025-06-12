"use client";

import { useState, useEffect } from 'react';
import { CashAppPaymentEmailContent } from '@/types/email';
import {
  saveNamedProfile,
  getNamedProfiles,
  loadNamedProfile,
  deleteNamedProfile,
  clearAllProfiles,
  exportProfiles,
  importProfiles,
  SavedProfile
} from '@/lib/utils/profile-storage';

interface ProfileManagerProps {
  currentContent: CashAppPaymentEmailContent;
  onLoadProfile: (content: CashAppPaymentEmailContent) => void;
  className?: string;
}

export function ProfileManager({ currentContent, onLoadProfile, className = "" }: ProfileManagerProps) {
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [showManager, setShowManager] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load profiles on component mount
  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    const savedProfiles = getNamedProfiles();
    setProfiles(savedProfiles);
  };

  const handleSaveProfile = async () => {
    if (!newProfileName.trim()) {
      setMessage({ type: 'error', text: 'Please enter a profile name' });
      return;
    }

    setSaving(true);
    const success = saveNamedProfile(newProfileName.trim(), currentContent);
    
    if (success) {
      setMessage({ type: 'success', text: `Profile "${newProfileName}" saved successfully!` });
      setNewProfileName('');
      loadProfiles();
    } else {
      setMessage({ type: 'error', text: 'Failed to save profile' });
    }
    
    setSaving(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLoadProfile = (profileId: string) => {
    const content = loadNamedProfile(profileId);
    if (content) {
      onLoadProfile(content);
      setMessage({ type: 'success', text: 'Profile loaded successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: 'Failed to load profile' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteProfile = (profileId: string) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      const success = deleteNamedProfile(profileId);
      if (success) {
        setMessage({ type: 'success', text: 'Profile deleted successfully!' });
        loadProfiles();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete profile' });
      }
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleExportProfiles = () => {
    const exportData = exportProfiles();
    if (exportData) {
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cashapp-payment-profiles-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: 'Profiles exported successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: 'Failed to export profiles' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleImportProfiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = importProfiles(content);
        if (success) {
          setMessage({ type: 'success', text: 'Profiles imported successfully!' });
          loadProfiles();
        } else {
          setMessage({ type: 'error', text: 'Failed to import profiles' });
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Invalid file format' });
      }
      setTimeout(() => setMessage(null), 3000);
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete ALL saved profiles? This cannot be undone.')) {
      const success = clearAllProfiles();
      if (success) {
        setMessage({ type: 'success', text: 'All profiles cleared successfully!' });
        loadProfiles();
      } else {
        setMessage({ type: 'error', text: 'Failed to clear profiles' });
      }
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
          Profile Manager
        </h4>
        <button
          type="button"
          onClick={() => setShowManager(!showManager)}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {showManager ? 'Hide' : 'Show'} Manager
        </button>
      </div>

      {showManager && (
        <div className="border dark:border-gray-600 rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
          {/* Save New Profile */}
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Save Current Configuration</h5>
            <div className="flex gap-2">
              <input
                type="text"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                placeholder="Enter profile name..."
                className="flex-1 p-2 text-sm border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                onKeyPress={(e) => e.key === 'Enter' && handleSaveProfile()}
              />
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={saving || !newProfileName.trim()}
                className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Saved Profiles List */}
          {profiles.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Saved Profiles ({profiles.length})</h5>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {profiles.map((profile) => (
                  <div key={profile.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded border dark:border-gray-600">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {profile.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Updated: {new Date(profile.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <button
                        type="button"
                        onClick={() => handleLoadProfile(profile.id)}
                        className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded"
                      >
                        Load
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProfile(profile.id)}
                        className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Import/Export */}
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Import/Export</h5>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleExportProfiles}
                className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                Export All
              </button>
              <label className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded cursor-pointer">
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportProfiles}
                  className="hidden"
                />
              </label>
              {profiles.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-2 text-sm rounded ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {message.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
