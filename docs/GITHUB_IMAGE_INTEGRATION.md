# GitHub Image Integration Guide

## Overview

This guide explains how to use GitHub for image hosting and integrate it with your email sender project. GitHub provides several ways to host and serve images that can be used in your email templates.

## GitHub Image Hosting Methods

### 1. Repository Raw Files

Store images in your repository and access them via GitHub's raw file URLs:

```
https://raw.githubusercontent.com/username/repo-name/branch/path/to/image.jpg
```

**Pros:**
- ✅ Free and unlimited for public repos
- ✅ Version controlled with your code
- ✅ Easy to manage and update
- ✅ Reliable GitHub CDN delivery

**Cons:**
- ❌ Large files increase repo size
- ❌ Raw URLs may be blocked by some email clients
- ❌ Not optimized for high-traffic image serving

### 2. GitHub Pages

Enable GitHub Pages and serve images from your custom domain:

```
https://username.github.io/repo-name/images/profile.jpg
```

**Pros:**
- ✅ Better email client compatibility
- ✅ Custom domain support
- ✅ Automatic HTTPS
- ✅ GitHub CDN backing

**Cons:**
- ❌ Public repos only (for free accounts)
- ❌ Build process required for some setups

### 3. GitHub Releases

Upload images as release assets:

```
https://github.com/username/repo-name/releases/download/v1.0.0/profile.jpg
```

**Pros:**
- ✅ Versioned asset management
- ✅ Large file support
- ✅ Separate from main repo size
- ✅ Permanent URLs

**Cons:**
- ❌ Manual upload process
- ❌ Less convenient for frequent updates

## Implementation Strategy

### Recommended Approach: Hybrid System

Based on your current setup, here's the recommended approach:

1. **Keep existing CDN images** (Cash App, Chime, etc.) for authenticity
2. **Use GitHub for custom/additional images** that you control
3. **Implement fallback system** for reliability

### File Structure

```
public/
├── images/
│   ├── profiles/
│   │   ├── default-avatar.jpg
│   │   ├── business-profile-1.jpg
│   │   ├── business-profile-2.jpg
│   │   └── personal-profile-1.jpg
│   ├── logos/
│   │   ├── custom-bank-logo.png
│   │   └── fallback-logo.png
│   └── icons/
│       ├── check-mark.svg
│       └── warning-icon.svg
```

## Code Integration

### 1. Image URL Configuration

Create a centralized image configuration:

```typescript
// lib/config/images.ts
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/your-username/your-repo/main/public/images';

export const IMAGE_URLS = {
  profiles: {
    default: `${GITHUB_BASE_URL}/profiles/default-avatar.jpg`,
    business1: `${GITHUB_BASE_URL}/profiles/business-profile-1.jpg`,
    business2: `${GITHUB_BASE_URL}/profiles/business-profile-2.jpg`,
    personal1: `${GITHUB_BASE_URL}/profiles/personal-profile-1.jpg`,
  },
  logos: {
    customBank: `${GITHUB_BASE_URL}/logos/custom-bank-logo.png`,
    fallback: `${GITHUB_BASE_URL}/logos/fallback-logo.png`,
  },
  // Keep existing CDN URLs
  external: {
    cashApp: 'https://cash-images-f.squarecdn.com/apps/imgs/P8Ick4Us9UicmB66kcUQxC.jpeg?width=120',
    chimeLogo: 'https://braze-images.com/appboy/communication/assets/image_assets/images/65cb26e0d78955004bdec58e/original.png',
  }
};
```

### 2. Enhanced Profile Image Selector

Update your ProfileImageSelector to include GitHub-hosted images:

```typescript
// components/ProfileImageSelector.tsx
import { IMAGE_URLS } from '@/lib/config/images';

const PROFILE_IMAGES = [
  // Existing Cash App images
  {
    url: IMAGE_URLS.external.cashApp,
    name: 'María Elena Rodriguez',
    description: 'Cash App Original',
    source: 'cashapp'
  },
  // New GitHub-hosted images
  {
    url: IMAGE_URLS.profiles.business1,
    name: 'Business Profile 1',
    description: 'Professional Avatar',
    source: 'github'
  },
  {
    url: IMAGE_URLS.profiles.business2,
    name: 'Business Profile 2', 
    description: 'Corporate Avatar',
    source: 'github'
  },
  {
    url: IMAGE_URLS.profiles.personal1,
    name: 'Personal Profile 1',
    description: 'Casual Avatar',
    source: 'github'
  }
];
```

### 3. Fallback System

Implement a robust fallback system:

```typescript
// lib/utils/image-fallback.ts
export function getImageWithFallback(primaryUrl: string, fallbackUrl?: string): string {
  // In email templates, we can't do runtime checks, so we use CSS fallbacks
  return primaryUrl;
}

export function generateImageFallbackCSS(primaryUrl: string, fallbackUrl: string): string {
  return `
    background-image: url('${fallbackUrl}'), url('${primaryUrl}');
    background-size: cover;
    background-position: center;
  `;
}
```

## Email Template Integration

### Update Email Templates

Modify your email templates to use the new image system:

```typescript
// lib/emails/cashapp-payment/standard.ts
import { IMAGE_URLS } from '@/lib/config/images';

export function generateCashAppPaymentEmail(content: CashAppPaymentEmailContent): string {
  const profileImage = content.senderProfileImage || IMAGE_URLS.profiles.default;
  const logoUrl = IMAGE_URLS.external.cashApp; // Keep using Cash App's CDN for authenticity
  
  // Rest of your template logic...
}
```

## Best Practices

### 1. Image Optimization

Before uploading to GitHub:

```bash
# Install image optimization tools
npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant

# Optimize images
imagemin public/images/profiles/*.jpg --out-dir=public/images/profiles/optimized --plugin=mozjpeg
imagemin public/images/logos/*.png --out-dir=public/images/logos/optimized --plugin=pngquant
```

### 2. Naming Conventions

Use consistent naming:
- `profile-business-male-1.jpg`
- `profile-personal-female-2.jpg`
- `logo-bank-primary.png`
- `icon-status-success.svg`

### 3. Size Guidelines

- **Profile images**: 120x120px (to match Cash App sizing)
- **Logos**: Max 200px width, maintain aspect ratio
- **Icons**: 24x24px or 32x32px SVG preferred

### 4. Email Client Testing

Test GitHub-hosted images across email clients:

```typescript
// lib/utils/email-testing.ts
export const TEST_IMAGES = {
  github: 'https://raw.githubusercontent.com/your-username/your-repo/main/public/images/test-profile.jpg',
  githubPages: 'https://your-username.github.io/your-repo/images/test-profile.jpg',
  external: 'https://cash-images-f.squarecdn.com/apps/imgs/P8Ick4Us9UicmB66kcUQxC.jpeg?width=120'
};
```

## Quick Start Steps

### 1. Setup GitHub Repository Structure

```bash
mkdir -p public/images/{profiles,logos,icons}
```

### 2. Add Sample Images

Place optimized images in the appropriate directories.

### 3. Create Image Configuration

Create `lib/config/images.ts` with your GitHub URLs.

### 4. Update Components

Modify your ProfileImageSelector and email templates to use the new system.

### 5. Test Integration

Test image loading across different email clients and scenarios.

## Next Steps

1. **Create the image directory structure** in your repository
2. **Add optimized images** to GitHub
3. **Implement the image configuration system**
4. **Update your existing components** to use GitHub-hosted images
5. **Test thoroughly** across email clients

This hybrid approach gives you the reliability of GitHub hosting while maintaining the authenticity of existing CDN images.
