import os
import subprocess
import tempfile
import base64
from typing import Optional
from openai import OpenAI
from tools.translator import TranslationTool

class VideoTool:
    """
    A tool to extract audio from video, transcribe, translate,
    synthesize speech, and re-merge into a localized video.
    """

    def __init__(
        self,
        locale: str,
        api_key: Optional[str] = None,
        transcription_model: str = "whisper-1",
        tts_model: str = "tts-1",
        tts_voice: str = "alloy"
    ):
        """
        :param locale: target locale (for translation)
        :param api_key: OpenAI API key (fall back to OPENAI_API_KEY env var)
        :param transcription_model: model for audio-to-text
        :param tts_model: model for text-to-speech
        :param tts_voice: desired voice for TTS
        """
        key = api_key or os.getenv("OPENAI_API_KEY")
        if not key:
            raise ValueError("No OpenAI API key provided")
        self.client = OpenAI(api_key=key)
        self.translation_tool = TranslationTool(locale, api_key=key)
        self.transcription_model = transcription_model
        self.tts_model = tts_model
        self.tts_voice = tts_voice
        self.locale = locale

    def dub(self, video_path: str) -> str:
        """
        Translates and dubs the video's audio track into the target locale.
        Returns the path to the new video (or original on failure).
        """
        if not os.path.exists(video_path):
            print(f"⚠️ File not found: {video_path}")
            return video_path

        # 1. Extract original audio
        audio_file = self._extract_audio(video_path)
        if not audio_file:
            return video_path

        # 2. Transcribe to text
        transcript = self._transcribe_audio(audio_file)
        if not transcript:
            return video_path

        # 3. Translate text
        translated = self.translation_tool.translate(transcript)

        # 4. Synthesize speech
        dubbed_audio = self._synthesize_speech(translated)
        if not dubbed_audio:
            return video_path

        # 5. Replace audio in video
        output_video = self._replace_audio(video_path, dubbed_audio)
        return output_video or video_path

    def _extract_audio(self, video_path: str) -> Optional[str]:
        """Extracts audio track to a WAV file."""
        tmp = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
        tmp_path = tmp.name
        tmp.close()
        cmd = [
            "ffmpeg", "-y", "-i", video_path,
            "-vn",                    # no video
            "-acodec", "pcm_s16le",
            "-ar", "16000",         # 16kHz sample rate
            tmp_path
        ]
        try:
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            return tmp_path
        except Exception as e:
            print(f"⚠️ Audio extraction failed: {e}")
            return None

    def _transcribe_audio(self, audio_path: str) -> Optional[str]:
        """Uses OpenAI Whisper to transcribe audio to text."""
        try:
            with open(audio_path, 'rb') as audio_f:
                resp = self.client.audio.transcriptions.create(
                    model=self.transcription_model,
                    file=audio_f
                )
            return resp.text.strip()
        except Exception as e:
            print(f"⚠️ Transcription failed: {e}")
            return None

    def _synthesize_speech(self, text: str) -> Optional[str]:
        """Converts translated text to speech and writes to a WAV file."""
        tmp = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
        tts_path = tmp.name
        tmp.close()
        try:
            # Assuming OpenAI TTS endpoint returns base64-encoded WAV
            resp = self.client.audio.speech.create(
                model=self.tts_model,
                input=text,
                voice=self.tts_voice,
                format="wav"
            )
            # If resp.audio is base64 string:
            audio_bytes = base64.b64decode(resp.audio)
            with open(tts_path, 'wb') as f:
                f.write(audio_bytes)
            return tts_path
        except Exception as e:
            print(f"⚠️ TTS synthesis failed: {e}")
            return None

    def _replace_audio(self, video_path: str, audio_path: str) -> Optional[str]:
        """Merges new audio track back into the video."""
        base, ext = os.path.splitext(video_path)
        output = f"{base}-{self.locale.lower().replace(' ', '_')}{ext}"
        cmd = [
            "ffmpeg", "-y",
            "-i", video_path,
            "-i", audio_path,
            "-c:v", "copy",
            "-map", "0:v:0",
            "-map", "1:a:0",
            "-shortest",
            output
        ]
        try:
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print(f"✅ Saved dubbed video to {output}")
            return output
        except Exception as e:
            print(f"⚠️ Audio replace failed: {e}")
            return None
