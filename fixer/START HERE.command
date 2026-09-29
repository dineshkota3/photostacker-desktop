#!/bin/bash
# Photo Stacker — one-click install & fix.
# Double-clicking this file installs the app into /Applications, clears the
# macOS quarantine flag (the misleading "damaged app" message on unsigned
# downloads), and opens the app. No Terminal knowledge needed.

DIR="$(cd "$(dirname "$0")" && pwd)"
APP_SRC="$DIR/Photo Stacker.app"
APP_DST="/Applications/Photo Stacker.app"

say_step() {
  # Friendly dialog so non-terminal users know what happened
  osascript -e "display dialog \"$1\" with title \"Photo Stacker\" buttons {\"OK\"} default button \"OK\"" >/dev/null 2>&1
}

# 1. Install the app if it isn't already in /Applications
if [ ! -d "$APP_DST" ]; then
  if [ -d "$APP_SRC" ]; then
    cp -R "$APP_SRC" "$APP_DST" 2>/dev/null
  fi
fi

# 2. Clear the quarantine flag macOS added during download
if [ -d "$APP_DST" ]; then
  xattr -cr "$APP_DST" 2>/dev/null
  # 3. Launch
  open "$APP_DST"
  exit 0
fi

say_step "Photo Stacker could not be installed automatically. Please drag the Photo Stacker icon onto the Applications folder in this window, then double-click START HERE again."
open "$DIR"
exit 1
