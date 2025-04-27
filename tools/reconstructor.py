#!/usr/bin/env python3
"""
Hard-Coded Website Rebuilder

This script takes a pre-built localized_site folder containing:
  01_raw/    ← original site files
  04_images/ ← localized images
  05_videos/ ← localized videos

It reconstructs the final website in 06_final/ by:
  1) Copying 01_raw → 06_final
  2) Overlaying all files from 04_images into 06_final
  3) Overlaying all files from 05_videos into 06_final

No JSON parsing; paths are hard-coded. After running, serve 06_final/ with your preferred HTTP server.
"""
import os
import shutil
import json

# ======== CONFIGURATION ========
BASE_DIR = "/Users/anastassiyayegarmina/Documents/dev/WebsiteLocalizer/WebsiteLocaliserDisk/scripts/localized_site/input_data-localized-azerbaijani"
RAW_DIR   = os.path.join(BASE_DIR, '01_raw')
TEXT_JSON = os.path.join(BASE_DIR, '03_translated', 'translated_entries.json')
IMG_DIR   = os.path.join(BASE_DIR, '04_images')
VID_DIR   = os.path.join(BASE_DIR, '05_videos')
FINAL_DIR = os.path.join(BASE_DIR, '06_final')
# =================================


# Only touch HTML (built static pages)
TEXT_EXT = [".html", ".htm"]
# ────────────────────────────────────────────────────────────────────────────────

# 1) Copy the entire built site to FINAL_DIR
if os.path.exists(FINAL_DIR):
    shutil.rmtree(FINAL_DIR)
shutil.copytree(RAW_DIR, FINAL_DIR)

# 2) Load translations
with open(TEXT_JSON, "r", encoding="utf-8") as f:
    entries = json.load(f)

# 3) Apply text replacements in all .html files
for entry in entries:
    if entry["type"] != "text":
        continue
    src    = entry["source"]
    # figure out the matching path under FINAL_DIR
    relpath = os.path.relpath(src, RAW_DIR)
    target  = os.path.join(FINAL_DIR, relpath)
    _, ext  = os.path.splitext(target)
    if ext.lower() in TEXT_EXT and os.path.exists(target):
        data = open(target, "r", encoding="utf-8").read()
        data = data.replace(entry["content"], entry["translated"])
        open(target, "w", encoding="utf-8").write(data)

# 4) Overlay images and videos
for folder, key in ((IMG_DIR, "new_source"), (VID_DIR, "dubbed_source")):
    if not os.path.isdir(folder):
        continue
    for root, _, files in os.walk(folder):
        for fname in files:
            src     = os.path.join(root, fname)
            # calculate where the original lived under RAW_DIR
            rel     = os.path.relpath(src, folder)
            dest    = os.path.join(FINAL_DIR, rel)
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            shutil.copy2(src, dest)

print("✅ Rebuild complete. FINAL_DIR contains your localized site.")

