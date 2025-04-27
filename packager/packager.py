import os
import shutil
from typing import List, Dict

class Packager:
    """
    Gathers translated text, localized images, and dubbed videos,
    applies them over a copy of the original site, and outputs a
    fully localized version of the project.
    """

    def __init__(self, project_root: str, entries: List[Dict]):
        """
        :param project_root: root directory of the localized project
        :param entries: list of dicts produced by the LocalizerAgent containing:
            - type: 'text' | 'image' | 'video'
            - source: original file path under 01_raw
            - content: original text (for text entries)
            - translated: translated text (for text entries)
            - new_source: new image path (for image entries)
            - dubbed_source: new video path (for video entries)
        """
        self.project_root = project_root
        self.raw_dir = os.path.join(project_root, '01_raw')
        self.entries = entries
        self.output_dir = os.path.join(project_root, '06_final')

    def package(self) -> None:
        """
        Creates a copy of 01_raw in 06_final, then iterates over all
        entries and applies translations and asset replacements in-place.
        """
        # 1. Clean or create the packaged output directory
        if os.path.exists(self.output_dir):
            shutil.rmtree(self.output_dir)
        shutil.copytree(self.raw_dir, self.output_dir)

        # 2. Apply each localized entry
        for entry in self.entries:
            etype = entry.get('type')
            if etype == 'text':
                self._apply_text(entry)
            elif etype == 'image':
                self._apply_asset(entry, key='new_source')
            elif etype == 'video':
                self._apply_asset(entry, key='dubbed_source')

        print(f"✅ Packaged localized site to: {self.output_dir}")

    def _apply_text(self, entry: Dict) -> None:
        """
        Replaces occurrences of the original text snippet with the translated text
        in the corresponding file within the packaged directory.
        """
        original = entry.get('content')
        translated = entry.get('translated')
        src_path = entry.get('source')
        if not original or not translated or not src_path:
            return

        # Compute the path in the packaged directory
        rel_path = os.path.relpath(src_path, start=self.raw_dir)
        dest_path = os.path.join(self.output_dir, rel_path)
        if not os.path.isfile(dest_path):
            return

        # Read, replace, and write back
        with open(dest_path, 'r', encoding='utf-8') as f:
            text = f.read()
        updated = text.replace(original, translated)
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(updated)

    def _apply_asset(self, entry: Dict, key: str) -> None:
        """
        Copies a new asset (image or video) over the original.

        :param entry: the entry dict containing 'source' and e.g. 'new_source'
        :param key: which key holds the localized asset path ('new_source' or 'dubbed_source')
        """
        src_path = entry.get('source')
        new_path = entry.get(key)
        if not src_path or not new_path or not os.path.isfile(new_path):
            return

        # Compute destination in packaged directory
        rel_path = os.path.relpath(src_path, start=self.raw_dir)
        dest_path = os.path.join(self.output_dir, rel_path)
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        shutil.copyfile(new_path, dest_path)
