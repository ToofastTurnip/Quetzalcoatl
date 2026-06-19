# Quetzalcoatl

A fake social media platform for use in film and TV productions, or anywhere you need convincing fake social media posts on a phone screen. Originally built as a prop for a D&D campaign, rebuilt as a general-purpose tool for producers and directors.

The app looks and feels like a real social media app. An admin panel lets you manage all posts and branding without touching any code.

---

## Features

- Twitter/X-style scrollable feed with real-looking posts
- Tappable `@mentions` → profile view, tappable `#hashtags` → tag feed
- **Admin panel** (Admin tab) for creating, editing, and deleting posts
- Branding editor: change the platform name, icon emoji, and colors live
- Like and repost buttons that actually increment counts
- Engagement counts editable directly (set likes to 10,000 without tapping it 10,000 times)
- Import and export posts as JSON
- Images in posts (file picker or URL)
- First-boot onboarding: start blank or load example posts
- Dark mode support
- PWA-ready for iOS "Add to Home Screen" (feels native, shows a real icon)

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node)
- Ionic CLI: `npm install -g @ionic/cli`

---

## Running in the browser (quickest way to test)

```bash
cd ion-quez
npm install
ionic serve
```

Then open `http://localhost:8100` in your browser.

---

## Building for Android (free, sideload APK)

1. Install [Android Studio](https://developer.android.com/studio) and accept the SDK licenses.

2. Build and sync:
   ```bash
   cd ion-quez
   npm install
   ionic build
   npx cap sync android
   ```

3. Open in Android Studio:
   ```bash
   npx cap open android
   ```

4. In Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**

5. Transfer the APK to the Android phone (AirDrop, email, USB, etc.) and install it. You may need to allow "Install from unknown sources" in the phone's settings.

---

## Running on iOS (free PWA, no Mac/Xcode required)

The app is configured as a PWA. Any iPhone can add it to the home screen where it will look and behave like a native app.

1. Build the web app and serve it somewhere the phone can reach. The easiest option for local use is:
   ```bash
   cd ion-quez
   npm install
   ionic serve --external
   ```
   Note the IP address printed (e.g. `http://192.168.1.42:8100`).

2. On the iPhone, open **Safari** and navigate to that address.

3. Tap the **Share** button (box with arrow) → **Add to Home Screen** → **Add**.

The app now appears on the home screen with the Quetzalcoatl icon, opens full-screen with no browser chrome, and is indistinguishable from a native app on camera.

> For a more permanent setup, deploy the built `www/` folder to any static host (Netlify, GitHub Pages, etc.) and use that URL instead.

---

## Building for iOS (native, requires Xcode)

Requires a Mac with Xcode and an Apple Developer account (free tier works for personal device installs).

```bash
cd ion-quez
npm install
ionic build
npx cap sync ios
npx cap open ios
```

Then build and run from Xcode onto a connected device.

---

## Generating app icons and splash screens

Uses the [`@capacitor/assets`](https://github.com/ionic-team/capacitor-assets) tool. Install it from the **repo root** (not inside `ion-quez/`):

```bash
npm install @capacitor/assets --save-dev
```

Place source images in `ion-quez/resources/`:

```
resources/
├── icon-only.png          # 1024×1024, no padding
├── icon-foreground.png    # foreground layer (Android adaptive)
├── icon-background.png    # background layer (Android adaptive)
├── splash.png
└── splash-dark.png
```

Then generate all sizes:

```bash
cd ion-quez
npx capacitor-assets generate
```

---

## Changing the app name

The platform name shown inside the app is controlled from the **Admin tab** and is stored on the device, no rebuild needed.

To change the actual native app icon name (what appears under the icon on the home screen), edit `ion-quez/capacitor.config.ts`:

```ts
const config: CapacitorConfig = {
  appId: 'com.quetzalcoatl.social',
  appName: 'YourAppName',   // ← change this
  webDir: 'www'
};
```

Then rebuild and reinstall.

---

## Admin panel usage

Open the app and tap the **Admin** tab (wrench icon, far right).

| Section | What you can do |
|---|---|
| **Branding** | Change platform name, tagline, icon emoji, primary/accent colors, toggle engagement counts |
| **Appearance** | Toggle dark mode |
| **Data** | Export all posts as JSON, import a JSON file, reset to example posts, clear everything |
| **All Posts** | Search, edit any post (all fields including timestamp and likes), or delete |

From any tab, tap the **+** button (bottom-right) to create a new post.

---

## Post JSON format

Posts are stored as a JSON array. Each post has this shape:

```json
{
  "id": "post_1234567890_abc1234",
  "handle": "LeaLea",
  "displayName": "LeaLea",
  "avatar": "LL",
  "avatarIsImage": false,
  "content": "TAMSIN ARES WAKE UP!! PLEASE!!!!!!!! #TheHunt",
  "timestamp": "2024-05-09T16:30:00Z",
  "likes": 8923,
  "reposts": 3124,
  "replies": 1087,
  "imageUrl": "https://example.com/optional-image.jpg"
}
```

- `avatar`: either 1–2 character initials string (when `avatarIsImage: false`) or a URL/base64 image (when `avatarIsImage: true`)
- `imageUrl`: optional; omit the field entirely if there's no image
- `timestamp`: ISO 8601 format; controls how old the post appears

You can export your current posts, edit the JSON in any text editor, and re-import them. This is the fastest way to bulk-create posts.
