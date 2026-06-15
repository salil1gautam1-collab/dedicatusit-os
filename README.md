# DedicatusIT — Daily Operating System

A local-first daily + weekly tracker built around your 10 operating laws. Works on
Windows 11 and iPhone, runs offline, and stores everything on your device. You can
add OneDrive sync later so both devices show the same data — but it works fully
without it.

What's in the box:

    index.html              the whole app (open it to use it)
    manifest.webmanifest    makes it installable on your phone
    sw.js                   offline support
    icons/                  home-screen icons
    README.md               this file

---

## 1. Use it right now on Windows 11

Double-click `index.html`. It opens in your browser and works immediately —
your entries are saved on that device. That's it for desktop.

(Tip: in Edge, the **…** menu → **Apps → Install this site as an app** gives you a
clean standalone window. Optional.)

---

## 2. Put it on your iPhone

Your phone can't open a file sitting on your laptop, so the app needs a web
address. The free way is GitHub Pages — you already have GitHub.

1. Go to https://github.com/new and create a repository, e.g. `dedicatusit-os`.
   Set it to **Public** (Pages needs that on the free plan).
2. On the new repo page click **uploading an existing file**, then drag in
   `index.html`, `manifest.webmanifest`, `sw.js`, and the whole `icons` folder.
   Click **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set
   **Source = Deploy from a branch**, **Branch = main**, folder **/ (root)**, Save.
4. Wait ~1 minute, refresh. Pages shows your live URL, like
   `https://YOURNAME.github.io/dedicatusit-os/`.

On your iPhone:

5. Open that URL in **Safari**.
6. Tap the **Share** icon → **Add to Home Screen** → **Add**.

You now have an app icon. It opens full-screen and works offline.

---

## 3. (Optional) Turn on OneDrive sync — both devices, same data

Without this, each device keeps its own copy (you can still move data with the
**Export / Import** buttons under the **Local** chip — export on one device,
save the file to OneDrive, import on the other).

For automatic sync, register a free Microsoft app once and paste one ID into the
app. No password or secret is ever stored in the file.

1. Sign in at https://portal.azure.com with your Microsoft account.
2. Search **App registrations** → **New registration**.
   - Name: `DedicatusIT OS`
   - Supported account types: **Personal Microsoft accounts only**
   - Redirect URI: choose **Single-page application (SPA)** and enter your
     GitHub Pages URL exactly, e.g. `https://YOURNAME.github.io/dedicatusit-os/`
   - Register.
3. Add a second SPA redirect URI for local use: **Authentication → Add a
     platform → Single-page application →** add `http://localhost:5500` (or
     whatever you use locally). Save. *(Skip if you only ever use the live URL.)*
4. Copy the **Application (client) ID** from the Overview page.
5. Open `index.html`, find the `CONFIG` block near the top of the `<script>`,
   and paste it in:

       const CONFIG = {
         clientId: "PASTE-YOUR-CLIENT-ID-HERE",
         ...
       };

6. Re-upload `index.html` to GitHub (same drag-and-drop, commit).
7. Open the app, tap the chip in the top-right → **Connect**, sign in with your
   Microsoft account, approve access. The chip turns green and reads **OneDrive**.

From then on, edits sync to a single `data.json` in a private app folder in your
OneDrive. Open the app on the other device, connect the same account, and they
stay in step (most-recent edit wins).

---

## Daily use

- **Today** — your Pareto top 3, the four compounding habits (each with a streak),
  the founder-leverage check, and one end-of-day line. Arrows move between days.
- **Week** — weekly top 3, Murphy's backup, Kidlin problem cards, case-study
  progress, and a familiarity tally with a 4-week trend.
- **Filter** — drop any new idea, answer four questions, get a DO NOW / DEFER /
  DROP verdict, and file it.
- **Laws** — the 10 laws as one-line reminders.

Built to fill in under three minutes a day. The streaks are the point — keep them
alive and the compounding takes care of itself.
