"use client";

import React, { useState, useEffect } from 'react';
import { generateSender, clearSuffixCache } from '@/lib/emails/sender-generator';

interface SenderConfigurationProps {
  service: 'paypal' | 'zelle' | 'chime' | 'cashapp';
  currentSender?: string;
  onSenderChange: (sender: string) => void;
  className?: string;
}

export function SenderConfiguration({
  service,
  currentSender,
  onSenderChange,
  className = ""
}: SenderConfigurationProps) {
  const [senderMode, setSenderMode] = useState<'random' | 'custom'>('random');
  const [customSender, setCustomSender] = useState('');
  const [generatedSender, setGeneratedSender] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Memoize display name to avoid hydration issues
  const displayName = React.useMemo(() => {
    if (!isClient) return '';
    return generateSender(service).displayName;
  }, [service, isClient]);

  // Ensure we're on the client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate initial random sender only on client
  useEffect(() => {
    if (isClient) {
      const sender = generateSender(service, { useRandom: true });
      setGeneratedSender(sender.formatted);
      if (!currentSender) {
        onSenderChange(sender.formatted);
      }
    }
  }, [service, isClient, currentSender, onSenderChange]);

  // Handle mode change
  const handleModeChange = (mode: 'random' | 'custom') => {
    setSenderMode(mode);

    if (mode === 'random') {
      onSenderChange(generatedSender);
    } else {
      const defaultCustom = `${displayName} <customersupport${service}dept@customersupportagent.support>`;
      setCustomSender(defaultCustom);
      onSenderChange(defaultCustom);
    }
  };

  // Generate new random sender
  const generateNewSender = () => {
    const sender = generateSender(service, { useRandom: true });
    setGeneratedSender(sender.formatted);
    if (senderMode === 'random') {
      onSenderChange(sender.formatted);
    }
  };

  // Handle custom sender change
  const handleCustomSenderChange = (value: string) => {
    setCustomSender(value);
    onSenderChange(value);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Sender Configuration
        </label>

        {/* Mode Selection */}
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name={`sender-mode-${service}`}
              value="random"
              checked={senderMode === 'random'}
              onChange={() => handleModeChange('random')}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Random Department</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name={`sender-mode-${service}`}
              value="custom"
              checked={senderMode === 'custom'}
              onChange={() => handleModeChange('custom')}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Custom Sender</span>
          </label>
        </div>

        {/* Random Mode */}
        {senderMode === 'random' && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={isClient ? generatedSender : 'Loading...'}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              />
              <button
                type="button"
                onClick={generateNewSender}
                disabled={!isClient}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors disabled:opacity-50"
              >
                🎲 New Random
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Generates realistic department suffixes like "mt", "dp", "ops", "mgmt", etc.
            </p>
          </div>
        )}

        {/* Custom Mode */}
        {senderMode === 'custom' && (
          <div className="space-y-3">
            <input
              type="text"
              value={customSender}
              onChange={(e) => handleCustomSenderChange(e.target.value)}
              placeholder={`${displayName} <customersupport${service}dept@customersupportagent.support>`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Format: Display Name &lt;email@customersupportagent.support&gt;<br/>
              <strong>Important:</strong> Use this format so Gmail shows "Zelle Support Agency" or "PayPal Support Agency" instead of just the domain.
            </p>
          </div>
        )}

        {/* Current Sender Preview */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Current Sender:</p>
          <p className="text-sm text-gray-900 dark:text-gray-100 font-mono break-all">
            {currentSender || generatedSender}
          </p>

          {/* Gmail Display Preview */}
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Gmail will show:</p>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {displayName ? displayName.charAt(0) : '?'}
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {displayName || 'Loading...'}
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ✅ Shows service name, not domain
            </p>
          </div>
        </div>
      </div>

      {/* Quick Examples - Only show on client to avoid hydration issues */}
      {isClient && (
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Example Random Senders:</p>
          <div className="space-y-1">
            {[1, 2, 3].map((i) => {
              const example = generateSender(service, { useRandom: true });
              return (
                <p key={i} className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {example.formatted}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
