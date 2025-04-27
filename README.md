# localizerAI


A small framework for extracting, translating/localizing, regenerating assets (text, images, audio/video), and rebuilding a static website for a new locale using OpenAI.

---

## Repository Structure

nastyaye/ (root) ├── agent/ # Orchestrator: LocalizerAgent │ └── localizer_agent.py │ ├── input_data/ # (optional) sample projects / input-data │ ├── packager/ # Packaging logic for final site │ └── packager.py │ ├── tools/ # Per-asset localization tools │ ├── translation_tool.py # Text → GPT → translated text │ ├── image_tool.py # Analyze + regenerate images │ ├── video_tool.py # Dub videos (Whisper → GPT → TTS → ffmpeg) │ └── audio_localizer.py # Standalone MP3 translator + TTS (if used) │ ├── config.py # (optional) hard-coded config (API key, defaults) ├── copy_project.py # Utility to copy raw build into working folder ├── extractor.py # Extract text/image/video entries into JSON ├── main.py # CLI entrypoint to run LocalizerAgent ├── localized_site.zip # (example) packaged localized site └── README.md
