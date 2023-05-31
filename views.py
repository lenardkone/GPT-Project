OutputGPT = "OutputGPT has no value."
userPrompt = "Null"


from flask import Blueprint, render_template, request, jsonify
import openai
from google.cloud import texttospeech
from google.cloud import storage

openai.api_key = "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"
client = texttospeech.TextToSpeechClient.from_service_account_file('static/tts-key.json')



views = Blueprint(__name__, "views")

@views.route('/')
def home():
    return render_template("welcome.html")


@views.route("/meditation")
def main():
    return render_template("meditation.html")

@views.route("/submit", methods=['POST'])
def submit():
    userPrompt = request.form['text_input']
    




    completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "Generate a creative and emotive ssml script for a meditation routine with breathing exercises based on how the user is feeling. It should include varied break times and vivid visualisations about the topic. NEVER Say ssml script! Only respond to prompts that include feelings & topics suitable for meditation."},
        {"role": "user", "content": "<speak><prosody volume='soft' rate='80%'>Find a quiet and comfortable place where you won't be disturbed... <break time='1s'/> Sit down and take a deep breath in through your nose, and then exhale through your mouth, letting go of any tension... <break time='2s'/> As you continue to breathe, allow yourself to think about your parents and the love they have given you... <break time='1s'/> Visualize them in your mind and feel the warmth of their embrace... <break time='2s'/> Think about all the sacrifices they have made for you, the lessons they have taught you, and the memories you have shared...  <break time='1s'/>  Allow yourself to feel a deep sense of gratitude for the gift of their presence in your life...  <break time='2s'/>  Imagine a golden light surrounding you, emanating from your heart...  <break time='1s'/>  With each inhale, feel this light expanding and growing, filling your body with warmth and love...  <break time='3s'/>  With each exhale, visualize this light reaching out to your parents, enveloping them in a warm embrace of gratitude and love...  <break time='1s'/>  Take a moment to offer them your heartfelt thanks and appreciation...  <break time='1s'/>  When you're ready, take a deep breath in, and then exhale fully, letting go of any remaining tension or discomfort...  <break time='2s'/>  Open your eyes and take a moment to ground yourself in your surroundings...  <break time='2s'/>  Remember that the love and gratitude you feel for your parents can be a source of strength and comfort whenever you need it...</prosody></speak>"},
        {"role": "assistant", "content": "What are the feelings you are experiencing?"},
        {"role": "user", "content": userPrompt},
    ]
)



    OutputGPT= completion.choices[0].message.content
    
    print(OutputGPT) 
    return jsonify(OutputGPT=OutputGPT, userPrompt=userPrompt)
    


@views.route('/tts', methods=['POST'])

def tts():
    data = request.get_json()
    result = data["resultJS"]
    

    synthesis_input = texttospeech.SynthesisInput(ssml=result)

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
            print('Audio content written to file "speech.wav"')
    return result

  




