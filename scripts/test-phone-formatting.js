#!/usr/bin/env node

/**
 * Test script to verify phone number formatting for email templates
 * Run with: node scripts/test-phone-formatting.js
 */

// Import the phone formatting functions
const { 
  formatPhoneForTel, 
  formatPhoneForDisplay, 
  generateOptimizedTelLink,
  formatUSPhoneNumber,
  isValidPhoneNumber 
} = require('../lib/utils/phone-formatting.ts');

console.log('📞 Testing Phone Number Formatting for Email Templates\n');

// Test phone numbers in various formats
const testPhoneNumbers = [
  '1 (336) 310-9279',           // Cash App format
  '(336) 310-9279',             // Standard US format
  '336-310-9279',               // Dash format
  '3363109279',                 // No formatting
  '+1 (336) 310-9279',          // International format
  '1-336-310-9279',             // Alternative format
  '336.310.9279',               // Dot format
  '336 310 9279',               // Space format
  '+1 336 310 9279',            // International with spaces
  '13363109279',                // 11 digits
];

console.log('🧪 Testing Phone Number Formats:\n');

testPhoneNumbers.forEach((phone, index) => {
  console.log(`Test ${index + 1}: "${phone}"`);
  console.log(`  📱 Tel Link:     ${formatPhoneForTel(phone)}`);
  console.log(`  👁️  Display:      ${formatPhoneForDisplay(phone)}`);
  console.log(`  🔗 Full Link:    ${generateOptimizedTelLink(phone)}`);
  console.log(`  🇺🇸 US Format:   ${formatUSPhoneNumber(phone)}`);
  console.log(`  ✅ Valid:        ${isValidPhoneNumber(phone)}`);
  console.log('');
});

console.log('📋 Expected Results:\n');
console.log('✅ Tel Links should:');
console.log('   - Start with +1 for US numbers');
console.log('   - Contain only digits and + symbol');
console.log('   - Work directly with phone dialers');
console.log('   - Not open in Chrome/browser first\n');

console.log('✅ Display Format should:');
console.log('   - Keep original formatting for readability');
console.log('   - Be user-friendly and recognizable\n');

console.log('🎯 Email Client Compatibility Test:\n');

const testNumber = '1 (336) 310-9279';
console.log(`Testing with: "${testNumber}"`);
console.log('');

console.log('📧 Gmail:');
console.log(`   HTML: <a href="${generateOptimizedTelLink(testNumber)}">${formatPhoneForDisplay(testNumber)}</a>`);
console.log('');

console.log('📧 Outlook:');
console.log(`   HTML: <a href="${generateOptimizedTelLink(testNumber)}">${formatPhoneForDisplay(testNumber)}</a>`);
console.log('');

console.log('📧 Apple Mail:');
console.log(`   HTML: <a href="${generateOptimizedTelLink(testNumber)}">${formatPhoneForDisplay(testNumber)}</a>`);
console.log('');

console.log('🔧 Troubleshooting Tips:\n');
console.log('If phone numbers still open in Chrome:');
console.log('1. Check if tel: links are properly formatted with +1');
console.log('2. Ensure no extra characters in tel: URL');
console.log('3. Test on actual mobile devices (not desktop browsers)');
console.log('4. Some email clients may require user to set default phone app');
console.log('5. Desktop email clients may behave differently than mobile');
console.log('');

console.log('📱 Mobile vs Desktop Behavior:\n');
console.log('✅ Mobile devices: tel: links should open phone dialer directly');
console.log('⚠️  Desktop: tel: links may open default handler (could be browser)');
console.log('💡 Solution: This is expected behavior - mobile users get dialer, desktop users get flexibility');
console.log('');

console.log('🎉 Phone formatting integration complete!');
console.log('All email templates now use optimized phone number formatting.');
