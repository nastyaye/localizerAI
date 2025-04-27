#!/usr/bin/env python3
"""
Standalone Video-Audio Merger Module

This script reads a manifest JSON of localized audio entries (MP3s) and
merges each MP3 with a specified video file, producing a new video file
with the localized audio track.

Configuration is hard-coded at the top.
"""
import os
import json
import subprocess

# ======== CONFIGURATION ========
# Path to the source video file you want to localize
VIDEO_SOURCE   = "//Users/anastassiyayegarmina/Documents/dev/WebsiteLocalizer/WebsiteLocaliserDisk/localized_projects/NotHelloFresh-localized-azerbaijan/project/public/videos/cooking.mp4"
# JSON manifest produced by audio_localizer.py
MANIFEST_JSON  = "/Users/anastassiyayegarmina/Documents/dev/localized_audio_entries.json"
# Output directory for merged videos
OUTPUT_DIR     = "/Users/anastassiyayegarmina/Documents/dev/WebsiteLocalizer/WebsiteLocaliserDisk/localized_projects/NotHelloFresh-localized-azerbaijan/project/public/videos"
# =================================

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load manifest
if not os.path.isfile(MANIFEST_JSON):
    print(f"⚠️ Manifest JSON not found: {MANIFEST_JSON}")
    exit(1)

with open(MANIFEST_JSON, 'r', encoding='utf-8') as jf:
    audio_entries = json.load(jf)

if not audio_entries:
    print(f"⚠️ No entries found in {MANIFEST_JSON}")
    exit(1)

# Process each audio entry
for entry in audio_entries:
    audio_path = entry.get('tts_source') or entry.get('tts_mp3')
    if not audio_path or not os.path.isfile(audio_path):
        print(f"⚠️ Audio file not found for entry: {entry}")
        continue

    # Derive output video path
    base_name = os.path.splitext(os.path.basename(VIDEO_SOURCE))[0]
    lang_suffix = os.path.splitext(os.path.basename(audio_path))[0].split('-')[-1]
    output_video = os.path.join(OUTPUT_DIR, f"{base_name}-{lang_suffix}.mp4")

    # Merge using ffmpeg: keep video, replace audio
    cmd = [
        "ffmpeg", "-y",
        "-i", VIDEO_SOURCE,
        "-i", audio_path,
        "-c:v", "copy",
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-shortest",
        output_video
    ]
    try:
        print(f"🎬 Merging video with audio: {audio_path}\n    -> {output_video}")
        subprocess.run(cmd, check=True)
        print(f"✅ Created localized video: {output_video}")
    except subprocess.CalledProcessError as e:
        print(f"⚠️ ffmpeg merge failed: {e}")
