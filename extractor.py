import os
import json
import re
import shutil
from typing import Any, Dict, List
from bs4 import BeautifulSoup

# File extensions to consider
TEXT_EXT: List[str]  = ['.html', '.htm', '.txt', '.md', '.js', '.jsx', '.ts', '.tsx']
IMAGE_EXT: List[str] = ['.jpg', '.jpeg', '.png', '.webp', '.svg']
VIDEO_EXT: List[str] = ['.mp4', '.webm', '.mov', '.avi', '.mkv']


def extract_text_from_html(content: str) -> str:
    """Extract visible text from an HTML file."""
    soup = BeautifulSoup(content, 'html.parser')
    return soup.get_text(separator=' ', strip=True)


def extract_text_from_tsx(content: str) -> List[str]:
    """Extract text snippets from TSX/JSX content."""
    pattern = r'>([^<>{}]{2,})<'  # between tags
    return [m.strip() for m in re.findall(pattern, content) if m.strip()]


def extract_all_entries(project_root: str) -> List[Dict[str, Any]]:
    """
    Walk project_root/01_raw and extract all text, image, and video entries.
    Also copy media to 04_images and 05_videos folders.
    Returns list of entry dicts.
    """
    raw_dir = os.path.join(project_root, '01_raw')
    images_dir = os.path.join(project_root, '04_images')
    videos_dir = os.path.join(project_root, '05_videos')
    extracted_dir = os.path.join(project_root, '02_extracted')
    os.makedirs(images_dir, exist_ok=True)
    os.makedirs(videos_dir, exist_ok=True)

    entries: List[Dict[str, Any]] = []
    for root, _, files in os.walk(raw_dir):
        for fname in files:
            src_path = os.path.join(root, fname)
            rel_path = os.path.relpath(src_path, raw_dir)
            ext = os.path.splitext(fname)[1].lower()
            try:
                if ext in TEXT_EXT:
                    with open(src_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    # HTML
                    if ext in ('.html', '.htm'):
                        text = extract_text_from_html(content)
                        if text.strip():
                            entries.append({'type':'text','source':src_path,'content':text})
                    # JS/TSX
                    elif ext in ('.js', '.jsx', '.ts', '.tsx'):
                        for snippet in extract_text_from_tsx(content):
                            entries.append({'type':'text','source':src_path,'content':snippet})
                    # MD/TXT
                    elif ext in ('.md', '.txt'):
                        stripped = content.strip()
                        if stripped:
                            entries.append({'type':'text','source':src_path,'content':stripped})

                elif ext in IMAGE_EXT:
                    # copy to 04_images
                    dest = os.path.join(images_dir, rel_path)
                    os.makedirs(os.path.dirname(dest), exist_ok=True)
                    shutil.copy2(src_path, dest)
                    entries.append({'type':'image','source':src_path,'extracted_path':dest,'content':None})

                elif ext in VIDEO_EXT:
                    # copy to 05_videos
                    dest = os.path.join(videos_dir, rel_path)
                    os.makedirs(os.path.dirname(dest), exist_ok=True)
                    shutil.copy2(src_path, dest)
                    entries.append({'type':'video','source':src_path,'extracted_path':dest,'content':None})

            except Exception as e:
                print(f"⚠️ Error processing {src_path}: {e}")
    return entries


def save_entries_to_json(entries: List[Dict[str, Any]], project_root: str) -> None:
    """Save extracted entries to 02_extracted/extracted_entries.json."""
    extracted_file = os.path.join(project_root, '02_extracted', 'extracted_entries.json')
    os.makedirs(os.path.dirname(extracted_file), exist_ok=True)
    with open(extracted_file, 'w', encoding='utf-8') as f:
        json.dump(entries, f, ensure_ascii=False, indent=2)
    print(f"✅ Saved {len(entries)} entries to {extracted_file}")


if __name__ == '__main__':
    # PROJECT_ROOT should be path to <ProjectName>-localized-<region>
    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__) + '/Users/anastassiyayegarmina/Documents/dev/WebsiteLocalizer/WebsiteLocaliserDisk/scripts/localized_site')
    entries = extract_all_entries(PROJECT_ROOT)
    save_entries_to_json(entries, PROJECT_ROOT)
    print(f"🔍 Extracted and saved entries and media under {PROJECT_ROOT}")
