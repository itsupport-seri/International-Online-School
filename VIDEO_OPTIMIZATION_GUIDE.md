# Video Optimization Guide - Mobile Performance Fix

## Problem
**Current:** 40.6MB hero video → LCP 10.8s on mobile ❌  
**Goal:** <5MB mobile video → LCP <2.5s ✅

---

## Solution: Create Multiple Video Versions

### Step 1: Create Compressed Mobile Video

Using FFmpeg (free, command-line tool):

```bash
# Install FFmpeg (macOS)
brew install ffmpeg

# Create mobile version (2-3MB)
ffmpeg -i public/video/1.mp4 \
  -vcodec libx265 \
  -crf 28 \
  -preset medium \
  -b:v 500k \
  -s 1280x720 \
  public/video/1-mobile.mp4

# Create tablet version (5-8MB)
ffmpeg -i public/video/1.mp4 \
  -vcodec libx265 \
  -crf 23 \
  -preset medium \
  -b:v 1000k \
  -s 1920x1080 \
  public/video/1-tablet.mp4

# Create WebM version (better compression for Chrome)
ffmpeg -i public/video/1.mp4 \
  -vcodec libvpx-vp9 \
  -b:v 500k \
  -crf 30 \
  -s 1280x720 \
  public/video/1-mobile.webm
```

### Expected Sizes After Compression
| Version | Codec | Size | Usage |
|---------|-------|------|-------|
| Original | H.264 | 40.6MB | Desktop |
| Mobile MP4 | H.265 | 2-3MB | <768px |
| Tablet MP4 | H.265 | 5-8MB | 768-1024px |
| Mobile WebM | VP9 | 1.5-2MB | Chrome mobile |

---

## Step 2: Update Hero Section Component

Replace video with adaptive source:

```jsx
// app/components/sections/HeroSection.jsx

<video
  ref={videoRef}
  className="absolute inset-0 w-full h-full object-cover object-center"
  loop
  muted          
  playsInline    
  preload="metadata"
  poster="/video/1-poster.jpg"
>
  {/* Mobile (WebM) */}
  <source 
    src="/video/1-mobile.webm" 
    type="video/webm"
    media="(max-width: 768px)"
  />
  
  {/* Tablet (MP4 H.265) */}
  <source 
    src="/video/1-tablet.mp4" 
    type="video/mp4; codecs=hevc"
    media="(min-width: 769px) and (max-width: 1024px)"
  />
  
  {/* Desktop (Original MP4) */}
  <source 
    src="/video/1.mp4" 
    type="video/mp4"
  />
  
  Your browser does not support the video tag.
</video>
```

---

## Step 3: Add Poster Image

Create a poster (first frame of video):

```bash
# Extract poster from video (0.5s into video)
ffmpeg -ss 0.5 -i public/video/1.mp4 \
  -vf "scale=1920:1080" \
  -q:v 5 \
  public/video/1-poster.jpg

# Create optimized AVIF version
ffmpeg -ss 0.5 -i public/video/1.mp4 \
  -vf "scale=1920:1080" \
  -f image2 \
  -c:v libaom-av1 \
  -b:v 0 \
  -cpu-used 4 \
  public/video/1-poster.avif
```

---

## Step 4: Advanced - Lazy Load Video

Only start loading video when user interacts or section is visible:

```jsx
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Start loading video only when hero section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current?.parentElement) {
      observer.observe(videoRef.current.parentElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section>
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video/1-poster.jpg"
        >
          <source src="/video/1-mobile.webm" type="video/webm" />
          <source src="/video/1-mobile.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/video/1-poster.jpg"
          alt="Loading..."
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}
      {/* Rest of content */}
    </section>
  );
}
```

---

## Step 5: Configure for CDN

Add to `next.config.mjs`:

```javascript
images: {
  formats: ["image/avif", "image/webp"],
},
assetPrefix: process.env.ASSET_PREFIX || '',
```

---

## Expected Results After Implementation

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Video Size (Mobile)** | 40.6MB | 2-3MB | -93% |
| **LCP** | 10.8s | 1.8-2.2s | -80% |
| **Total Blocking Time** | 250ms | 50-80ms | -70% |
| **Mobile Performance** | 73 | 92-96 | +20-25pts |
| **Speed Index** | 2.9s | 1.5s | -48% |

---

## Quick Commands (Copy & Paste)

```bash
cd /Users/girijashankarmohanta/landing-page

# 1. Install FFmpeg (one-time)
brew install ffmpeg

# 2. Create mobile MP4 (2-3MB)
ffmpeg -i public/video/1.mp4 -vcodec libx265 -crf 28 -preset medium -b:v 500k -s 1280x720 public/video/1-mobile.mp4

# 3. Create mobile WebM (1.5-2MB, better for Chrome)
ffmpeg -i public/video/1.mp4 -vcodec libvpx-vp9 -b:v 500k -crf 30 -s 1280x720 public/video/1-mobile.webm

# 4. Create poster image (JPG)
ffmpeg -ss 0.5 -i public/video/1.mp4 -vf "scale=1920:1080" -q:v 5 public/video/1-poster.jpg

# 5. Verify file sizes
ls -lh public/video/
```

---

## Before & After Comparison

**BEFORE (Desktop-only video):**
- Hero video: 40.6MB
- Mobile LCP: 10.8s ❌
- Mobile Performance: 73
- Network waterfall: Video blocks everything

**AFTER (Adaptive video):**
- Mobile video: 2-3MB
- Mobile LCP: 1.8-2.2s ✓
- Mobile Performance: 92-96 ✓
- Network waterfall: Video loads in parallel

---

## Why This Works

1. **H.265 Codec** - Better compression than H.264 (40-50% smaller)
2. **Lower Resolution** - 1280x720 sufficient for mobile (already downsampled by browser)
3. **Lower Bitrate** - 500kbps is enough for video quality on small screens
4. **WebP/WebM** - Modern browsers use more efficient codecs
5. **Poster Image** - Shown immediately (while video loads)
6. **Lazy Loading** - Video only loads when needed

---

## Browser Support

| Format | Chrome | Firefox | Safari | Mobile |
|--------|--------|---------|--------|--------|
| MP4 H.264 | ✅ | ✅ | ✅ | ✅ |
| MP4 H.265 | ✅ | ❌ | ✅ | ✅ |
| WebM VP9 | ✅ | ✅ | ❌ | ✅ |
| Poster JPG | ✅ | ✅ | ✅ | ✅ |

→ Fallback chain ensures compatibility!

---

## Troubleshooting

**Video not playing?**
```bash
# Check if codec is installed
ffmpeg -codecs | grep hevc
ffmpeg -codecs | grep vp9
```

**File still large?**
- Decrease bitrate: `-b:v 300k` (lower quality, smaller file)
- Decrease resolution: `-s 960x540` (smaller screen size)

**Poster not showing?**
- Ensure JPEG path is correct
- Check poster size: `ls -lh public/video/1-poster.jpg`

