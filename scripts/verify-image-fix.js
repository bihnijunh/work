#!/usr/bin/env node

/**
 * Verification script to test that the GitHub image hosting fix is working
 * This script verifies that:
 * 1. All required images are present locally
 * 2. The next.config.js includes raw.githubusercontent.com
 * 3. The image configuration is properly set up
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying GitHub Image Hosting Fix\n');

// Check 1: Verify next.config.js includes raw.githubusercontent.com
console.log('1. Checking next.config.js configuration...');
try {
  const nextConfigPath = path.join(process.cwd(), 'next.config.js');
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  if (nextConfigContent.includes('raw.githubusercontent.com')) {
    console.log('   ✅ raw.githubusercontent.com is configured in next.config.js');
  } else {
    console.log('   ❌ raw.githubusercontent.com is NOT configured in next.config.js');
    process.exit(1);
  }
} catch (error) {
  console.log('   ❌ Could not read next.config.js:', error.message);
  process.exit(1);
}

// Check 2: Verify all required images are present
console.log('\n2. Checking local image files...');
const requiredImages = [
  'public/images/profiles/maria-elena-rodriguez.jpeg',
  'public/images/logos/cashapp-logo.png',
  'public/images/logos/paypal-header-logo.png',
  'public/images/logos/paypal-footer-logo.png',
  'public/images/logos/chime-header-logo.png',
  'public/images/logos/chime-footer-logo.png',
  'public/images/logos/chime-verification.png',
  'public/images/logos/zelle-logo.png',
  'public/images/social/x.png',
  'public/images/social/instagram.png',
  'public/images/social/twitch.png',
  'public/images/social/tiktok.png',
  'public/images/icons/green-heart-emoji.png',
  'public/images/icons/chime-social/instagram.png',
  'public/images/icons/chime-social/twitter.png',
  'public/images/icons/chime-social/tiktok.png',
  'public/images/icons/chime-social/facebook.png',
];

let missingFiles = 0;
let presentFiles = 0;

for (const imagePath of requiredImages) {
  const fullPath = path.join(process.cwd(), imagePath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`   ✅ ${imagePath} (${stats.size} bytes)`);
    presentFiles++;
  } else {
    console.log(`   ❌ ${imagePath} - MISSING`);
    missingFiles++;
  }
}

console.log(`\n   📊 Summary: ${presentFiles} present, ${missingFiles} missing`);

// Check 3: Verify image configuration file
console.log('\n3. Checking image configuration...');
try {
  const configPath = path.join(process.cwd(), 'lib/config/images.ts');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  if (configContent.includes('raw.githubusercontent.com')) {
    console.log('   ✅ Image configuration uses GitHub hosting');
  } else {
    console.log('   ❌ Image configuration does not use GitHub hosting');
  }
  
  if (configContent.includes('fallback')) {
    console.log('   ✅ Fallback system is configured');
  } else {
    console.log('   ⚠️  No fallback system detected');
  }
} catch (error) {
  console.log('   ❌ Could not read image configuration:', error.message);
}

// Final summary
console.log('\n📋 Final Summary:');
if (missingFiles === 0) {
  console.log('🎉 All checks passed! The GitHub image hosting fix should resolve the Next.js error.');
  console.log('\n💡 Next steps:');
  console.log('   1. Restart your Next.js development server');
  console.log('   2. Test the application to ensure images load correctly');
  console.log('   3. The error "hostname raw.githubusercontent.com is not configured" should be resolved');
} else {
  console.log('⚠️  Some issues were found. Please address the missing files above.');
  process.exit(1);
}
