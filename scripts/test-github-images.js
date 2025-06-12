#!/usr/bin/env node

/**
 * Test script to verify GitHub-hosted images are accessible
 * Run with: node scripts/test-github-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration - Update these with your actual GitHub details
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'bihnijunh';
const GITHUB_REPO = process.env.GITHUB_REPO || 'work';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

// Test URLs
const TEST_URLS = {
  githubRaw: `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/public/images/profiles/maria-elena-rodriguez.jpeg`,
  localFile: './public/images/profiles/maria-elena-rodriguez.jpeg',
  originalCDN: 'https://cash-images-f.squarecdn.com/apps/imgs/P8Ick4Us9UicmB66kcUQxC.jpeg?width=120'
};

console.log('🧪 Testing GitHub Image Integration\n');
console.log('Configuration:');
console.log(`  GitHub User: ${GITHUB_USERNAME}`);
console.log(`  Repository: ${GITHUB_REPO}`);
console.log(`  Branch: ${GITHUB_BRANCH}\n`);

// Test 1: Check if local file exists
function testLocalFile() {
  return new Promise((resolve) => {
    console.log('📁 Test 1: Checking local file...');
    
    if (fs.existsSync(TEST_URLS.localFile)) {
      const stats = fs.statSync(TEST_URLS.localFile);
      console.log(`  ✅ Local file exists: ${TEST_URLS.localFile}`);
      console.log(`  📊 File size: ${stats.size} bytes`);
      console.log(`  📅 Modified: ${stats.mtime.toISOString()}\n`);
      resolve(true);
    } else {
      console.log(`  ❌ Local file not found: ${TEST_URLS.localFile}\n`);
      resolve(false);
    }
  });
}

// Test 2: Check GitHub raw URL accessibility
function testGitHubURL() {
  return new Promise((resolve) => {
    console.log('🌐 Test 2: Testing GitHub raw URL...');
    console.log(`  URL: ${TEST_URLS.githubRaw}`);
    
    const request = https.get(TEST_URLS.githubRaw, (response) => {
      console.log(`  📡 Status: ${response.statusCode} ${response.statusMessage}`);
      console.log(`  📋 Content-Type: ${response.headers['content-type']}`);
      console.log(`  📏 Content-Length: ${response.headers['content-length']} bytes`);
      
      if (response.statusCode === 200) {
        console.log('  ✅ GitHub URL is accessible\n');
        resolve(true);
      } else {
        console.log('  ❌ GitHub URL is not accessible\n');
        resolve(false);
      }
      
      response.resume(); // Consume response data to free up memory
    });
    
    request.on('error', (error) => {
      console.log(`  ❌ Error accessing GitHub URL: ${error.message}\n`);
      resolve(false);
    });
    
    request.setTimeout(10000, () => {
      console.log('  ⏰ Request timed out\n');
      request.destroy();
      resolve(false);
    });
  });
}

// Test 3: Check original CDN URL (for comparison)
function testOriginalCDN() {
  return new Promise((resolve) => {
    console.log('🔗 Test 3: Testing original CDN URL...');
    console.log(`  URL: ${TEST_URLS.originalCDN}`);
    
    const request = https.get(TEST_URLS.originalCDN, (response) => {
      console.log(`  📡 Status: ${response.statusCode} ${response.statusMessage}`);
      console.log(`  📋 Content-Type: ${response.headers['content-type']}`);
      console.log(`  📏 Content-Length: ${response.headers['content-length']} bytes`);
      
      if (response.statusCode === 200) {
        console.log('  ✅ Original CDN URL is accessible\n');
        resolve(true);
      } else {
        console.log('  ❌ Original CDN URL is not accessible\n');
        resolve(false);
      }
      
      response.resume();
    });
    
    request.on('error', (error) => {
      console.log(`  ❌ Error accessing CDN URL: ${error.message}\n`);
      resolve(false);
    });
    
    request.setTimeout(10000, () => {
      console.log('  ⏰ Request timed out\n');
      request.destroy();
      resolve(false);
    });
  });
}

// Test 4: Compare file sizes
function compareFileSizes() {
  return new Promise((resolve) => {
    console.log('📊 Test 4: Comparing file sizes...');
    
    // Get local file size
    let localSize = 0;
    if (fs.existsSync(TEST_URLS.localFile)) {
      localSize = fs.statSync(TEST_URLS.localFile).size;
    }
    
    // Get GitHub file size
    const request = https.get(TEST_URLS.githubRaw, { method: 'HEAD' }, (response) => {
      const githubSize = parseInt(response.headers['content-length'] || '0');
      
      console.log(`  📁 Local file: ${localSize} bytes`);
      console.log(`  🌐 GitHub file: ${githubSize} bytes`);
      
      if (localSize === githubSize && localSize > 0) {
        console.log('  ✅ File sizes match - GitHub sync is working\n');
        resolve(true);
      } else if (localSize === 0) {
        console.log('  ⚠️  Local file not found\n');
        resolve(false);
      } else {
        console.log('  ⚠️  File sizes don\'t match - may need to push changes\n');
        resolve(false);
      }
    });
    
    request.on('error', () => {
      console.log('  ❌ Could not check GitHub file size\n');
      resolve(false);
    });
    
    request.setTimeout(5000, () => {
      request.destroy();
      resolve(false);
    });
  });
}

// Main test runner
async function runTests() {
  const results = {
    localFile: await testLocalFile(),
    githubURL: await testGitHubURL(),
    originalCDN: await testOriginalCDN(),
    sizeComparison: await compareFileSizes()
  };
  
  console.log('📋 Test Results Summary:');
  console.log('========================');
  console.log(`Local File:      ${results.localFile ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`GitHub URL:      ${results.githubURL ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Original CDN:    ${results.originalCDN ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Size Match:      ${results.sizeComparison ? '✅ PASS' : '⚠️  CHECK'}\n`);
  
  // Overall status
  const allPassed = results.localFile && results.githubURL && results.originalCDN;
  
  if (allPassed) {
    console.log('🎉 All tests passed! GitHub image integration is working correctly.');
    console.log('\n📝 Next steps:');
    console.log('1. Commit and push your changes to GitHub');
    console.log('2. Test the email sending functionality');
    console.log('3. Verify images display correctly in email clients');
  } else {
    console.log('⚠️  Some tests failed. Please check the issues above.');
    console.log('\n🔧 Troubleshooting:');
    if (!results.localFile) {
      console.log('- Run the download script again to get the image file');
    }
    if (!results.githubURL) {
      console.log('- Make sure you\'ve pushed the image to GitHub');
      console.log('- Check that the repository is public or you have access');
      console.log('- Verify the GitHub username and repository name');
    }
    if (!results.originalCDN) {
      console.log('- The original CDN might be temporarily unavailable');
    }
  }
  
  process.exit(allPassed ? 0 : 1);
}

// Run the tests
runTests().catch(console.error);
