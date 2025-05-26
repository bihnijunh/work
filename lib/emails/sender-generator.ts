/**
 * Generate realistic email sender addresses with random department suffixes
 */

// Realistic department/division suffixes
const DEPARTMENT_SUFFIXES = [
  'mt', 'dp', 'cs', 'sp', 'hq', 'ops', 'sec', 'fin', 'adm', 'svc',
  'div', 'grp', 'dept', 'unit', 'team', 'desk', 'hub', 'ctr', 'off', 'mgmt',
  'sup', 'asst', 'lead', 'dir', 'coord', 'spec', 'rep', 'agent', 'admin', 'exec'
];

// Cache for consistent suffixes within sessions/threads
const suffixCache = new Map<string, string>();

/**
 * Generate a random department suffix
 */
function getRandomSuffix(): string {
  return DEPARTMENT_SUFFIXES[Math.floor(Math.random() * DEPARTMENT_SUFFIXES.length)];
}

/**
 * Generate a consistent suffix for a service (cached for session)
 */
function getConsistentSuffix(service: string): string {
  if (!suffixCache.has(service)) {
    suffixCache.set(service, getRandomSuffix());
  }
  return suffixCache.get(service)!;
}

/**
 * Generate sender email address with random department suffix
 */
export function generateSenderEmail(
  service: 'paypal' | 'zelle' | 'chime' | 'cashapp',
  options: {
    useRandom?: boolean; // If true, always generate new random suffix
    consistent?: boolean; // If true, use same suffix for this service in session
  } = {}
): string {
  const { useRandom = true, consistent = false } = options;

  let suffix: string;

  if (consistent) {
    suffix = getConsistentSuffix(service);
  } else if (useRandom) {
    suffix = getRandomSuffix();
  } else {
    // Fallback to simple suffix
    suffix = 'cs';
  }

  return `customersupport${service}${suffix}@customersupportagent.support`;
}

/**
 * Generate display name for email sender
 */
export function generateSenderDisplayName(service: 'paypal' | 'zelle' | 'chime' | 'cashapp'): string {
  const serviceNames = {
    paypal: 'PayPal Support Agency',
    zelle: 'Zelle Support Agency',
    chime: 'Chime Support Agency',
    cashapp: 'Cash App Support Agency'
  };

  return serviceNames[service];
}

/**
 * Generate complete sender info (email + display name)
 */
export function generateSender(
  service: 'paypal' | 'zelle' | 'chime' | 'cashapp',
  options: {
    useRandom?: boolean;
    consistent?: boolean;
  } = {}
) {
  const email = generateSenderEmail(service, options);
  const displayName = generateSenderDisplayName(service);

  return {
    email,
    displayName,
    formatted: `${displayName} <${email}>`
  };
}

/**
 * Clear suffix cache (useful for testing or new sessions)
 */
export function clearSuffixCache(): void {
  suffixCache.clear();
}

/**
 * Get current cached suffixes (for debugging)
 */
export function getCachedSuffixes(): Record<string, string> {
  return Object.fromEntries(suffixCache.entries());
}
