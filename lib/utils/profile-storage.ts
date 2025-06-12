import { CashAppPaymentEmailContent } from '@/types/email';

// Storage keys for different profile types
const STORAGE_KEYS = {
  CASHAPP_PAYMENT_PROFILE: 'cashapp_payment_email_profile',
  CASHAPP_PAYMENT_PROFILES_LIST: 'cashapp_payment_profiles_list',
} as const;

export interface SavedProfile {
  id: string;
  name: string;
  content: CashAppPaymentEmailContent;
  createdAt: string;
  updatedAt: string;
}

/**
 * Check if localStorage is available (client-side only)
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Save the current profile to localStorage
 */
export function saveCurrentProfile(content: CashAppPaymentEmailContent): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    const profileData = {
      content,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.CASHAPP_PAYMENT_PROFILE, JSON.stringify(profileData));
    return true;
  } catch (error) {
    console.error('Failed to save profile:', error);
    return false;
  }
}

/**
 * Load the current profile from localStorage
 */
export function loadCurrentProfile(): CashAppPaymentEmailContent | null {
  if (!isLocalStorageAvailable()) return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CASHAPP_PAYMENT_PROFILE);
    if (!saved) return null;

    const profileData = JSON.parse(saved);
    return profileData.content || null;
  } catch (error) {
    console.error('Failed to load profile:', error);
    return null;
  }
}

/**
 * Save a named profile
 */
export function saveNamedProfile(name: string, content: CashAppPaymentEmailContent): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    const profiles = getNamedProfiles();
    const id = generateProfileId();
    const now = new Date().toISOString();
    
    const newProfile: SavedProfile = {
      id,
      name,
      content,
      createdAt: now,
      updatedAt: now,
    };
    
    // Check if profile with same name exists and update it
    const existingIndex = profiles.findIndex(p => p.name === name);
    if (existingIndex >= 0) {
      profiles[existingIndex] = {
        ...profiles[existingIndex],
        content,
        updatedAt: now,
      };
    } else {
      profiles.push(newProfile);
    }
    
    localStorage.setItem(STORAGE_KEYS.CASHAPP_PAYMENT_PROFILES_LIST, JSON.stringify(profiles));
    return true;
  } catch (error) {
    console.error('Failed to save named profile:', error);
    return false;
  }
}

/**
 * Get all named profiles
 */
export function getNamedProfiles(): SavedProfile[] {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CASHAPP_PAYMENT_PROFILES_LIST);
    if (!saved) return [];
    
    return JSON.parse(saved) || [];
  } catch (error) {
    console.error('Failed to load named profiles:', error);
    return [];
  }
}

/**
 * Load a specific named profile
 */
export function loadNamedProfile(id: string): CashAppPaymentEmailContent | null {
  const profiles = getNamedProfiles();
  const profile = profiles.find(p => p.id === id);
  return profile?.content || null;
}

/**
 * Delete a named profile
 */
export function deleteNamedProfile(id: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    const profiles = getNamedProfiles();
    const filteredProfiles = profiles.filter(p => p.id !== id);
    
    localStorage.setItem(STORAGE_KEYS.CASHAPP_PAYMENT_PROFILES_LIST, JSON.stringify(filteredProfiles));
    return true;
  } catch (error) {
    console.error('Failed to delete named profile:', error);
    return false;
  }
}

/**
 * Clear all saved profiles
 */
export function clearAllProfiles(): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    localStorage.removeItem(STORAGE_KEYS.CASHAPP_PAYMENT_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.CASHAPP_PAYMENT_PROFILES_LIST);
    return true;
  } catch (error) {
    console.error('Failed to clear profiles:', error);
    return false;
  }
}

/**
 * Generate a unique profile ID
 */
function generateProfileId(): string {
  return `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Export profile data as JSON
 */
export function exportProfiles(): string | null {
  try {
    const currentProfile = loadCurrentProfile();
    const namedProfiles = getNamedProfiles();
    
    const exportData = {
      currentProfile,
      namedProfiles,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    };
    
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Failed to export profiles:', error);
    return null;
  }
}

/**
 * Import profile data from JSON
 */
export function importProfiles(jsonData: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    const importData = JSON.parse(jsonData);
    
    if (importData.currentProfile) {
      saveCurrentProfile(importData.currentProfile);
    }
    
    if (importData.namedProfiles && Array.isArray(importData.namedProfiles)) {
      localStorage.setItem(STORAGE_KEYS.CASHAPP_PAYMENT_PROFILES_LIST, JSON.stringify(importData.namedProfiles));
    }
    
    return true;
  } catch (error) {
    console.error('Failed to import profiles:', error);
    return false;
  }
}
