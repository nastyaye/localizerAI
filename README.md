# localizerAI


A small framework for extracting, translating/localizing, regenerating assets (text, images, audio/video), and rebuilding a static website for a new locale using OpenAI.

---

## Repository Structure

```text
localizerAI/
├── agent/
│   └── localizer_agent.py
├── input_data/
├── packager/
│   └── packager.py
├── tools/
│   ├── translation_tool.py
│   ├── image_tool.py
│   └── video_tool.py
├── config.py
├── copy_project.py
├── extractor.py
├── main.py
└── README.md

```
--

## Getting Started

### Prerequisites

- Python 3.8+  
- [ffmpeg](https://ffmpeg.org/) (for audio/video extraction & merging)  
- A valid OpenAI API key (set `OPENAI_API_KEY` env var or drop into `config.py`)

### Installation

```bash
git clone https://github.com/yourname/nastyaye.git
cd nastyaye
```
# (Optional) create a venv
```
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
```
Usage

1. Prepare your raw build
2. 
Build your site (e.g. npm run build) and copy the resulting static files into
input_data-localized-<region>/01_raw/.
3. Run the extractor
 ```
python extractor.py
```
This will generate 02_extracted/extracted_entries.json and pull out media into 04_images/ & 05_videos/.

5. Localize everything
 ```
python main.py /path/to/input_data-localized-<region> <Locale>
```
This invokes:
Text translation via GPT
Image regeneration
Video dubbing and writes 03_translated/translated_entries.json.

7. Rebuild the final site
```
python packager/reconstructor.py \
  --project_root /path/to/input_data-localized-<region> \
  --text_json 03_translated/translated_entries.json \
  --image_dir 04_images \
  --video_dir 05_videos
```
Outputs a fully localized static site in 06_final/.
Preview locally
```
cd /path/to/input_data-localized-<region>/06_final
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.
