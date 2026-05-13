# Quick Start: Video Compression (5 Minutes)

## One-Liner Commands - Copy & Paste

Open Terminal and run these commands one by one:

```bash
# 1. Navigate to project
cd /Users/girijashankarmohanta/landing-page

# 2. Install FFmpeg (one-time only)
brew install ffmpeg

# 3. Create mobile MP4 (2-3MB) - Fastest option
ffmpeg -i public/video/1.mp4 -vcodec libx265 -crf 28 -preset fast -b:v 500k -s 1280x720 public/video/1-mobile.mp4 -y

# 4. Create mobile WebM (1.5-2MB) - Best for Chrome
ffmpeg -i public/video/1.mp4 -vcodec libvpx-vp9 -b:v 400k -crf 32 -s 1280x720 public/video/1-mobile.webm -y

# 5. Create poster image (JPG)
ffmpeg -ss 1 -i public/video/1.mp4 -vf "scale=1920:1080" -q:v 5 public/video/1-poster.jpg -y

# 6. Check sizes
ls -lh public/video/1*.* | grep -E '(mobile|tablet|poster)'
```

---

## What Each Command Does

| Command | Creates | Size | Time |
|---------|---------|------|------|
| Mobile MP4 | `1-mobile.mp4` | 2-3MB | 2-3 min |
| Mobile WebM | `1-mobile.webm` | 1.5-2MB | 3-5 min |
| Poster | `1-poster.jpg` | 200-300KB | 5 sec |

---

## Expected Output

```bash
$ ls -lh public/video/1*.*

# BEFORE
-rw-r--r--  40.6M  1.mp4

# AFTER (what you should see)
-rw-r--r--  40.6M  1.mp4          # Original (kept for desktop)
-rw-r--r--  2.4M  1-mobile.mp4    # New mobile
-rw-r--r--  1.8M  1-mobile.webm   # New webm
-rw-r--r--  280K  1-poster.jpg    # New poster
```

---

## What Changed in Component

✅ **New HeroSection features:**
- Lazy loads video (only when section visible)
- Shows poster image while loading
- Serves mobile video on small screens
- Fallback to original video on desktop
- Auto-plays when ready

---

## Performance Impact

| Metric | Before | After |
|--------|--------|-------|
| Mobile video size | 40.6MB | 2.4MB |
| LCP on mobile | 10.8s | ~2.2s |
| Download time (4G) | 60+ seconds | 5-7 seconds |
| Total Blocking Time | 250ms | 50-80ms |

---

## If FFmpeg Install Fails

**Alternative: Online Tool**
1. Go to https://www.online-convert.com/
2. Upload `public/video/1.mp4`
3. Select output: "MP4 Video"
4. Settings: Resolution 1280x720, Bitrate 500k
5. Convert & download

---

## After Compression - Next Steps

1. ✅ Run the FFmpeg commands above
2. ✅ Verify files in `public/video/` directory
3. ✅ Component is already updated to use new files
4. ✅ Test on mobile: `npm run dev` → check Network tab
5. ✅ Build: `npm run build`
6. ✅ Deploy: `git push` (auto-deploys to Vercel)

---

## Testing

```bash
# Start dev server
npm run dev

# Open in browser
# http://localhost:3000

# In DevTools → Network tab:
# - Desktop: see 1.mp4 (40.6MB)
# - Mobile: see 1-mobile.mp4 (2.4MB)
# - Check video loads in ~5-7 seconds instead of 60+
```

---

## Troubleshooting

**Command not found: `ffmpeg`**
```bash
brew install ffmpeg
```

**"Permission denied" error**
```bash
sudo chmod 755 public/video/
```

**File still large?**
- Try: `-b:v 300k` (lower quality)
- Or: `-s 960x540` (smaller resolution)

**Video won't play?**
- Ensure files are in: `public/video/1-mobile.mp4`
- Verify poster: `public/video/1-poster.jpg`

---

## Performance Check After

Run Lighthouse (Chrome DevTools):
1. Open DevTools (F12)
2. Lighthouse tab
3. Mobile device
4. Run audit

Expected results:
- **Performance: 92-96** ✓ (up from 73)
- **LCP: <2.5s** ✓ (down from 10.8s)
- **TBT: <200ms** ✓ (down from 250ms)

