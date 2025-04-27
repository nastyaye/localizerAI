# tools/translation_tool.py

import os
from typing import Optional
from openai import OpenAI

class TranslationTool:
    """
    A simple wrapper around OpenAI’s Chat API for translating website copy.
    """

    def __init__(
        self,
        target_language: str,
        api_key: Optional[str] = None,
        model: str = "gpt-4.1"
    ):
        """
        :param target_language: e.g. "Azerbaijani"
        :param api_key: your OpenAI API key (defaults to env OPENAI_API_KEY)
        :param model: which GPT model to use
        """
        key = api_key or os.getenv("OPENAI_API_KEY")
        if not key:
            raise ValueError("No OpenAI API key provided")
        self.client = OpenAI(api_key=key)
        self.model = model
        self.target_language = target_language

    def translate(self, text: str) -> str:
        """
        Translate a single string into the target language,
        applying cultural rephrasing as needed.
        """
        prompt = (
            f"You are a professional website translator.\n"
            f"Translate the following text into {self.target_language}.\n"
            f"Use cultural rephrasing where needed (idioms, formality, references,\n"
            f"taboos, humor). Change place-names or cultural refs to ones\n"
            f"familiar in the target locale when appropriate.\n"
            f"IMPORTANT: Only output the translated text without any extra comments.\n\n"
            f"Text:\n"
            f"{text}"
        )

        try:
            resp = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}]
            )
            return resp.choices[0].message.content.strip()
        except Exception as e:
            # You can also log here if you have a logging setup
            # For now, just re-raise so the caller can decide how to fallback
            raise RuntimeError(f"Translation failed: {e}") from e
