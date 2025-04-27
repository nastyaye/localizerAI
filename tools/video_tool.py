#!/usr/bin/env python3


#!/usr/bin/env python3
"""
Standalone Audio Localizer Module

This script transcribes and localizes MP3 audio files. You can point
MP3_SOURCE at a single file or a directory. It will:
  1) Transcribe via Whisper
  2) Translate via GPT
  3) Synthesize speech via TTS
  4) Save new MP3s with a suffix
  5) Emit a JSON manifest of results

Configuration is hard-coded at the top.
"""
import os
import json
from openai import OpenAI

# ======== CONFIGURATION ========
API_KEY         = "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"
TARGET_LANGUAGE = "Azerbaijani"
# Point this to either a single .mp3 file or a directory containing .mp3s
MP3_SOURCE      = "/Users/anastassiyayegarmina/Documents/dev/WebsiteLocalizer/WebsiteLocaliserDisk/localized_projects/NotHelloFresh-localized-azerbaijan/project/voiceover.mp3"
OUTPUT_FILE     = "localized_audio_entries.json"
# =================================

client = OpenAI(api_key=API_KEY)

def transcribe_audio(mp3_path: str) -> str:
    print(f"🔍 Transcribing: {mp3_path}")
    with open(mp3_path, 'rb') as f:
        resp = client.audio.transcriptions.create(model="whisper-1", file=f)
    return resp.text.strip()

def translate_text(text: str) -> str:
    print(f"🌐 Translating to {TARGET_LANGUAGE}")
    prompt = (
        f"You are a professional translator. Translate the following text into {TARGET_LANGUAGE}. "
        "Only output the translated text without explanation.\n\n"
        f"Text:\n{text}"
    )
    resp = client.chat.completions.create(model="gpt-4.1", messages=[{"role":"user","content":prompt}])
    return resp.choices[0].message.content.strip()

def synthesize_speech(text: str, out_path: str) -> None:
    print(f"🎤 Generating TTS MP3: {out_path}")
    # The TTS endpoint returns raw binary MP3 data
    resp = client.audio.speech.create(model="tts-1", input=text, voice="alloy")
    # resp is HttpxBinaryResponseContent; read bytes
    audio_bytes = resp.read() if hasattr(resp, 'read') else resp
    with open(out_path, 'wb') as f:
        f.write(audio_bytes)


def main():
    # Build list of entries from MP3_SOURCE
    entries = []
    if os.path.isfile(MP3_SOURCE) and MP3_SOURCE.lower().endswith('.mp3'):
        entries.append({"type":"audio","source":MP3_SOURCE})
    elif os.path.isdir(MP3_SOURCE):
        for root, _, files in os.walk(MP3_SOURCE):
            for fn in files:
                if fn.lower().endswith('.mp3'):
                    entries.append({"type":"audio","source":os.path.join(root, fn)})
    else:
        print(f"⚠️ MP3 source not found (file or dir): {MP3_SOURCE}")
        return

    if not entries:
        print(f"⚠️ No MP3 files found at: {MP3_SOURCE}")
        return

    results = []
    for entry in entries:
        src = entry['source']
        transcript = transcribe_audio(src)
        translated = translate_text(transcript)
        base, _ = os.path.splitext(src)
        out_mp3 = f"{base}-{TARGET_LANGUAGE.lower()}.mp3"
        synthesize_speech(translated, out_mp3)
        entry.update({
            'transcript': transcript,
            'translated_text': translated,
            'tts_source': out_mp3
        })
        results.append(entry)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as jf:
        json.dump(results, jf, ensure_ascii=False, indent=2)
    print(f"✅ Done! Manifest written to {OUTPUT_FILE}")

if __name__ == '__main__':
    main()

