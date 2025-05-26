// Test script to demonstrate the random sender generator
// Run with: node test-sender-generator.js

const { generateSender, clearSuffixCache } = require('./lib/emails/sender-generator.ts');

console.log('🎯 Random Email Sender Generator Test\n');

// Test PayPal senders
console.log('📧 PayPal Senders:');
for (let i = 0; i < 5; i++) {
  const sender = generateSender('paypal', { useRandom: true });
  console.log(`   ${sender.formatted}`);
}

console.log('\n📧 Zelle Senders:');
for (let i = 0; i < 5; i++) {
  const sender = generateSender('zelle', { useRandom: true });
  console.log(`   ${sender.formatted}`);
}

console.log('\n📧 Chime Senders:');
for (let i = 0; i < 5; i++) {
  const sender = generateSender('chime', { useRandom: true });
  console.log(`   ${sender.formatted}`);
}

console.log('\n📧 Cash App Senders:');
for (let i = 0; i < 5; i++) {
  const sender = generateSender('cashapp', { useRandom: true });
  console.log(`   ${sender.formatted}`);
}

console.log('\n✅ Each email will now use a random department suffix like:');
console.log('   - customersupportpaypalmgt@customersupportagent.support');
console.log('   - customersupportzelledp@customersupportagent.support');
console.log('   - customersupportchimecs@customersupportagent.support');
console.log('   - customersupportcashappops@customersupportagent.support');
console.log('\n🎉 This makes emails look more authentic and professional!');
