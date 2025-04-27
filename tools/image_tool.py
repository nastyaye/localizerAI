import os
import base64
from typing import Optional
from openai import OpenAI

class ImageTool:
    """
    Wraps OpenAI Vision and Image APIs to analyze and regenerate
    images localized to a target region/language.
    """

    def __init__(
        self,
        locale: str,
        api_key: Optional[str] = None,
        analysis_model: str = "gpt-4.1",
        image_model: str = "gpt-image-1"
    ):
        """
        :param locale: target locale (e.g. "Azerbaijani" or region name)
        :param api_key: OpenAI API key (falls back to OPENAI_API_KEY env var)
        :param analysis_model: model for image content analysis
        :param image_model: model for image generation
        """
        key = api_key or os.getenv("OPENAI_API_KEY")
        if not key:
            raise ValueError("No OpenAI API key provided")
        self.client = OpenAI(api_key=key)
        self.locale = locale
        self.analysis_model = analysis_model
        self.image_model = image_model

    def _encode_image_to_base64(self, image_path: str) -> str:
        with open(image_path, "rb") as img_f:
            return base64.b64encode(img_f.read()).decode("utf-8")

    def analyze_image(self, image_path: str) -> Optional[str]:
        """
        Analyze an image to get a brief description suitable for localization.
        Returns a short objective description, or None on failure.
        """
        b64 = self._encode_image_to_base64(image_path)
        prompt_text = (
            "Describe the scene briefly for localization. Be short and objective."
        )
        try:
            resp = self.client.responses.create(
                model=self.analysis_model,
                input=[
                    {"role": "user", "content": prompt_text},
                    {"type": "input_image", "image_url": f"data:image/png;base64,{b64}"}
                ]
            )
            return resp.output_text.strip()
        except Exception as e:
            print(f"⚠️ Error analyzing image {image_path}: {e}")
            return None

    def generate_image(self, prompt: str, save_path: str) -> None:
        """
        Generate an image from a prompt and save it to disk.
        """
        try:
            resp = self.client.images.generate(
                model=self.image_model,
                prompt=prompt,
                size="1024x1024"
            )
            img_b64 = resp.data[0].b64_json
            img_bytes = base64.b64decode(img_b64)
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            with open(save_path, "wb") as out_f:
                out_f.write(img_bytes)
            print(f"✅ Saved localized image to {save_path}")
        except Exception as e:
            print(f"⚠️ Error generating image for prompt '{prompt}': {e}")

    def localize(self, source_path: str) -> str:
        """
        Analyze the source image, generate a localized version,
        and return the new file path (or original on failure).
        """
        if not os.path.exists(source_path):
            print(f"⚠️ File not found: {source_path}")
            return source_path

        description = self.analyze_image(source_path)
        if not description:
            return source_path

        # Build localization prompt
        prompt = (
            f"{description}. Adapt the scene to represent {self.locale} culture and "
            f"style, including local motifs, food, landscapes, and color palettes."
        )

        base, ext = os.path.splitext(source_path)
        new_path = f"{base}-{self.locale.lower().replace(' ', '_')}{ext}"
        self.generate_image(prompt, new_path)
        return new_path

