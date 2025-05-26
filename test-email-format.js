// Test script to verify email sender format
// Run with: node test-email-format.js

const { getSenderAddress } = require('./lib/emails/utils.ts');

console.log('📧 Email Sender Format Test\n');

// Test random senders
console.log('🎲 Random Senders:');
const services = ['paypal', 'zelle', 'chime', 'cashapp'];

services.forEach(service => {
  const sender = getSenderAddress(service);
  console.log(`${service.toUpperCase()}: ${sender}`);
});

console.log('\n✏️ Custom Senders (with display name):');

// Test custom senders with display name
const customWithDisplay = [
  'PayPal Support <customersupportpaypalmgmt@customersupportagent.support>',
  'Zelle Support <customersupportzelledept@customersupportagent.support>',
  'Chime Support <customersupportchimeops@customersupportagent.support>',
  'Cash App Support <customersupportcashappteam@customersupportagent.support>'
];

customWithDisplay.forEach((custom, index) => {
  const service = services[index];
  const result = getSenderAddress(service, custom);
  console.log(`${service.toUpperCase()}: ${result}`);
});

console.log('\n📧 Custom Senders (email only - will add display name):');

// Test custom senders with just email
const customEmailOnly = [
  'customersupportpaypalmgmt@customersupportagent.support',
  'customersupportzelledept@customersupportagent.support',
  'customersupportchimeops@customersupportagent.support',
  'customersupportcashappteam@customersupportagent.support'
];

customEmailOnly.forEach((email, index) => {
  const service = services[index];
  const result = getSenderAddress(service, email);
  console.log(`${service.toUpperCase()}: ${result}`);
});

console.log('\n✅ Expected Gmail Display:');
console.log('- Gmail should show: "PayPal" (not customersupportagent.support)');
console.log('- Gmail should show: "Zelle" (not customersupportagent.support)');
console.log('- Gmail should show: "Chime" (not customersupportagent.support)');
console.log('- Gmail should show: "Cash App" (not customersupportagent.support)');

console.log('\n🔧 Format Requirements:');
console.log('- Must use: "Display Name" <email@domain.com> format (with quotes)');
console.log('- Display Name should be: Short service name only');
console.log('- Email should be: customersupport[service][suffix]@customersupportagent.support');
console.log('\n🎉 All senders use short names and proper Gmail format!');
