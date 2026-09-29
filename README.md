# Photo Stacker (Desktop)

Mac desktop app wrapping the [Photo Stacker](https://github.com/dineshkota3/photostacker) web app.
Find similar/duplicate photos in a folder, keep the best ones, download or move
the rest to the Trash. Everything runs locally on your machine.

The web app lives in `web/` as a git submodule — the desktop app just builds and
wraps it. Desktop-only extras (move to Trash) are enabled through the Electron
bridge; the web version stays read-only.

## Build
```bash
git clone --recurse-submodules https://github.com/dineshkota3/photostacker-desktop.git
cd photostacker-desktop
npm install
npm run dist
```
Output: `release/Photo Stacker-0.1.0-arm64.dmg` (and `-x64.dmg` for Intel Macs).

## Install (unsigned build)
Drag **Photo Stacker.app** from the DMG into Applications. First launch:
**right-click the app → Open → Open** (macOS Gatekeeper blocks unsigned apps
from a plain double-click; this one-time bypass is all that's needed).

## Desktop-only features
- **Move to Trash** — after selecting photos, move them to the macOS Trash
  (recoverable) instead of downloading. Only offered in the desktop app.
