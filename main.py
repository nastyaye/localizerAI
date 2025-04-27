# main.py

import os
from config import OPENAI_API_KEY
from agent.agent import LocalizerAgent

def main():
    agent = LocalizerAgent(
        source_path="/Users/anastassiyayegarmina/Documents/dev/WebsiteLocalizer/WebsiteLocaliserDisk/input_data",
        locale="Azerbaijani",
        api_key=OPENAI_API_KEY
    )
    agent.run()

if __name__ == "__main__":
    main()