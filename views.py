OutputGPT = "OutputGPT has no value."
userPrompt = "Null"


from flask import Blueprint, render_template, request, jsonify
import openai
from google.cloud import texttospeech

openai.api_key = "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"
client = texttospeech.TextToSpeechClient.from_service_account_file('static/tts-key.json')




views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template("index.html")

@views.route("/submit", methods=['POST'])
def submit():
    userPrompt = request.form['text_input']

    messagePrompt = userPrompt
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo",messages=[
        {"role": "system", "content": "Act as an ssml script generator for text-to-speech with the task of creating a minute-long guided meditation based on how the user is feeling."},
        {"role": "user", "content": "Generate a meditation script for ssml text to speech based on the following example. Only write the ssml script. I will provide you with a specific emotion for the topic of the meditation:<speak><prosody volume='medium' rate='88%'>Find a quiet and comfortable place where you won't be disturbed... <break time='1s'/> Sit down and close your eyes... <break time='1s'/> Take a deep breath in through your nose, and then exhale through your mouth, letting go of any tension... <break time='1s'/> As you continue to breathe, allow yourself to acknowledge and feel any sadness or pain you may be experiencing... <break time='1s'/> Notice where you feel this emotion in your body - is it in your chest, your stomach, or elsewhere?...  <break time='1s'/>  Imagine yourself holding this feeling in your hands, cradling it with compassion and understanding...  <break time='1s'/>  Visualize this feeling as a cloud of mist that you can breathe in and out with each breath...  <break time='1s'/>  With each inhale, allow the mist to fill your body and bring comfort and peace...  <break time='1s'/>  With each exhale, release any tension or pain that you may be holding onto...  <break time='1s'/>  Remember that it's okay to feel sad, and that this feeling will eventually pass...  <break time='1s'/>  Offer yourself kindness and support in this moment...  <break time='1s'/> When you're ready, take a deep breath in, and then exhale fully, letting go of any remaining tension or discomfort...  <break time='1s'/>  Open your eyes and take a moment to ground yourself in your surroundings...  <break time='1s'/>  Remember that you can return to this meditation anytime you need to find comfort and support in your emotions...  </prosody></speak>"},
        {"role": "assistant", "content": "What are the feelings you are experiencing?"},
        {"role": "user", "content": messagePrompt}
        ]
    )
    OutputGPT= completion.choices[0].message.content
    
    print(OutputGPT) 
    return jsonify(OutputGPT=OutputGPT, userPrompt=userPrompt)
    


@views.route('/tts-process', methods=['POST'])

def tts():
    data = request.get_json()
    result = data["resultJS"]

    synthesis_input = texttospeech.SynthesisInput(ssml=result)

    voice = texttospeech.VoiceSelectionParams(
            language_code="en-GB",
            name="en-GB-Neural2-D",
            ssml_gender=texttospeech.SsmlVoiceGender.MALE,)

    audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3)

    response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config)

    with open("static/assets/speech.mp3", "wb") as out:
            out.write(response.audio_content)
            print('Audio content written to file "speech.mp3"')
    return result

  




