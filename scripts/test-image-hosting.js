#!/usr/bin/env node

/**
 * Test script to verify all GitHub-hosted images are accessible
 * This script tests all the images we've downloaded and hosted on GitHub
 */

const https = require('https');
const fs = require('fs');

// Configuration
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'bihnijunh';
const GITHUB_REPO = process.env.GITHUB_REPO || 'work';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/public/images`;

// All images that should be hosted on GitHub
const IMAGES_TO_TEST = [
  // Profile images
  `${GITHUB_BASE_URL}/profiles/maria-elena-rodriguez.jpeg`,
  
  // Logos
  `${GITHUB_BASE_URL}/logos/cashapp-logo.png`,
  `${GITHUB_BASE_URL}/logos/paypal-header-logo.png`,
  `${GITHUB_BASE_URL}/logos/paypal-footer-logo.png`,
  `${GITHUB_BASE_URL}/logos/chime-header-logo.png`,
  `${GITHUB_BASE_URL}/logos/chime-footer-logo.png`,
  `${GITHUB_BASE_URL}/logos/chime-verification.png`,
  `${GITHUB_BASE_URL}/logos/zelle-logo.png`,
  
  // Social media icons
  `${GITHUB_BASE_URL}/social/x.png`,
  `${GITHUB_BASE_URL}/social/instagram.png`,
  `${GITHUB_BASE_URL}/social/twitch.png`,
  `${GITHUB_BASE_URL}/social/tiktok.png`,
  
  // Icons
  `${GITHUB_BASE_URL}/icons/green-heart-emoji.png`,
  `${GITHUB_BASE_URL}/icons/chime-social/instagram.png`,
  `${GITHUB_BASE_URL}/icons/chime-social/twitter.png`,
  `${GITHUB_BASE_URL}/icons/chime-social/tiktok.png`,
  `${GITHUB_BASE_URL}/icons/chime-social/facebook.png`,
];

// Test function to check if an image URL is accessible
function testImageUrl(url) {
  return new Promise((resolve) => {
    const request = https.get(url, (response) => {
      const { statusCode, headers } = response;
      const contentType = headers['content-type'] || '';
      
      // Consume response data to free up memory
      response.resume();
      
      if (statusCode === 200 && contentType.startsWith('image/')) {
        resolve({
          url,
          success: true,
          statusCode,
          contentType,
          size: headers['content-length'] || 'unknown'
        });
      } else {
        resolve({
          url,
          success: false,
          statusCode,
          contentType,
          error: `Invalid response: ${statusCode} ${contentType}`
        });
      }
    });
    
    request.on('error', (error) => {
      resolve({
        url,
        success: false,
        error: error.message
      });
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      resolve({
        url,
        success: false,
        error: 'Request timeout'
      });
    });
  });
}

// Test local file existence
function testLocalFile(imagePath) {
  const localPath = imagePath.replace(GITHUB_BASE_URL, 'public/images');
  const exists = fs.existsSync(localPath);
  
  if (exists) {
    const stats = fs.statSync(localPath);
    return {
      path: localPath,
      exists: true,
      size: stats.size,
      modified: stats.mtime
    };
  } else {
    return {
      path: localPath,
      exists: false
    };
  }
}

// Main test function
async function runTests() {
  console.log('🧪 Testing GitHub Image Hosting Setup\n');
  console.log(`Repository: ${GITHUB_USERNAME}/${GITHUB_REPO}`);
  console.log(`Branch: ${GITHUB_BRANCH}`);
  console.log(`Base URL: ${GITHUB_BASE_URL}\n`);
  
  console.log('📁 Testing local file existence...\n');
  
  let localTestsPassed = 0;
  let localTestsFailed = 0;
  
  for (const imageUrl of IMAGES_TO_TEST) {
    const localTest = testLocalFile(imageUrl);
    if (localTest.exists) {
      console.log(`✅ ${localTest.path} (${localTest.size} bytes)`);
      localTestsPassed++;
    } else {
      console.log(`❌ ${localTest.path} - File not found`);
      localTestsFailed++;
    }
  }
  
  console.log(`\n📊 Local Files: ${localTestsPassed} passed, ${localTestsFailed} failed\n`);
  
  console.log('🌐 Testing GitHub URL accessibility...\n');
  
  let urlTestsPassed = 0;
  let urlTestsFailed = 0;
  
  for (const imageUrl of IMAGES_TO_TEST) {
    const result = await testImageUrl(imageUrl);
    if (result.success) {
      console.log(`✅ ${result.url} (${result.contentType}, ${result.size} bytes)`);
      urlTestsPassed++;
    } else {
      console.log(`❌ ${result.url} - ${result.error}`);
      urlTestsFailed++;
    }
  }
  
  console.log(`\n📊 GitHub URLs: ${urlTestsPassed} passed, ${urlTestsFailed} failed\n`);
  
  // Summary
  const totalTests = IMAGES_TO_TEST.length;
  const allLocalPassed = localTestsFailed === 0;
  const allUrlPassed = urlTestsFailed === 0;
  
  console.log('📋 Summary:');
  console.log(`Total images tested: ${totalTests}`);
  console.log(`Local files: ${allLocalPassed ? '✅ All present' : `❌ ${localTestsFailed} missing`}`);
  console.log(`GitHub URLs: ${allUrlPassed ? '✅ All accessible' : `❌ ${urlTestsFailed} failed`}`);
  
  if (allLocalPassed && allUrlPassed) {
    console.log('\n🎉 All tests passed! Your GitHub image hosting is working correctly.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please check the issues above.');
    process.exit(1);
  }
}

// Run the tests
runTests().catch(console.error);
