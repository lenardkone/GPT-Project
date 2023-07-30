from google.cloud import texttospeech
import openai
from flask import Blueprint, render_template, request, jsonify
OutputGPT = "OutputGPT has no value."
userPrompt = "Null"


# from google.cloud import storage

openai.api_key = "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"
client = texttospeech.TextToSpeechClient.from_service_account_file(
    'static/tts-key.json')
# storage_client = storage.Client()


views = Blueprint(__name__, "views")
# Renders the welcome page at the origin


@views.route('/')
def home():
    return render_template("welcome.html")


@views.route("/ai")
def main():
    return render_template("ai.html")

# Requests text input once user presses submit button


@views.route("/submit", methods=['POST'])
def submit():
    userPrompt = 
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-GB",
        name="en-GB-News-L",
        ssml_gender=texttospeech.SsmlVoiceGender.MALE,)

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.LINEAR16,
        sample_rate_hertz=48000
    )

    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config)

    with open("static/assets/speech.wav", "wb") as out:
        out.write(response.audio_content)
        print('Audio successfully written to "speech.wav"')
    return result
