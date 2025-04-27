# src/agent/localizer_agent.py 

import os
import json
from typing import Optional
from tools.translator import TranslationTool
from tools.image_tool import ImageTool
from WebsiteLocalizer.WebsiteLocaliserDisk.scripts.tools.video_tool2 import VideoTool
from packager.packager import Packager

class LocalizerAgent:
    """
    Loads pre-extracted entries (text, image, video),
    performs translation/localization, and packages the site.
    """
    def __init__(
        self,
        project_root: str,
        locale: str,
        api_key: Optional[str] = None
    ):
        """
        :param project_root: root of copied project (with 01_raw, 02_extracted, etc.)
        :param locale: target locale (e.g. "Azerbaijani")
        :param api_key: OpenAI API key (falls back to OPENAI_API_KEY)
        """
        self.project_root = project_root
        self.locale = locale
        self.paths = {
            'raw':       os.path.join(project_root, '01_raw'),
            'extracted': os.path.join(project_root, '02_extracted', 'extracted_entries.json'),
            'translated':os.path.join(project_root, '03_translated', 'translated_entries.json')
        }

        # Initialize tools
        self.translator = TranslationTool(target_language=locale, api_key=api_key)
        self.image_tool = ImageTool(locale=locale, api_key=api_key)
        self.video_tool = VideoTool(locale=locale, api_key=api_key)

    def run(self) -> None:
        """
        1) Load extracted entries JSON
        2) Translate text, localize images, dub videos
        3) Save translated entries JSON
        4) Package localized site
        """
        # 1) Load previously extracted entries
        with open(self.paths['extracted'], 'r', encoding='utf-8') as f:
            entries = json.load(f)

        # 2) Process each entry
        for entry in entries:
            etype = entry.get('type')
            if etype == 'text':
                entry['translated'] = self.translator.translate(entry['content'])
            elif etype == 'image':
                # use extracted_path if available, otherwise source
                src_path = entry.get('extracted_path') or entry['source']
                entry['new_source'] = self.image_tool.localize(src_path)
            elif etype == 'video':
                src_path = entry.get('extracted_path') or entry['source']
                entry['dubbed_source'] = self.video_tool.dub(src_path)

        # 3) Save translated entries
        os.makedirs(os.path.dirname(self.paths['translated']), exist_ok=True)
        with open(self.paths['translated'], 'w', encoding='utf-8') as f:
            json.dump(entries, f, ensure_ascii=False, indent=2)
        print(f"✅ Saved translated entries to {self.paths['translated']}")

        # 4) Package site
        Packager(self.project_root, entries).package()


