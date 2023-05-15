from google.cloud import texttospeech


client = texttospeech.TextToSpeechClient.from_service_account_file('static/tts-key.json')




text = "Begin by finding a quiet and comfortable place where you won't be disturbed. Sit cross-legged on a cushion or a chair with your spine straight and your hands resting on your lap. Close your eyes and take a deep breath in through your nose, filling your lungs completely. Hold the breath for a few seconds, and then exhale slowly through your mouth, letting go of any tension or stress. Now bring your attention to your breath. Follow the sensation of the breath as it enters and leaves your body. Don't try to control your breathing, just let it flow naturally. If your mind starts to wander, gently bring it back to your breath. You may find it helpful to silently count each inhale and exhale, up to a count of ten, and then start over again. As you focus on your breath, notice any thoughts or feelings that arise. Don't judge or analyze them, just observe them with detached awareness. Imagine that you are sitting by a stream, and your thoughts are like leaves floating by on the water."

synthesis_input = texttospeech.SynthesisInput(text=text)

voice = texttospeech.VoiceSelectionParams(
            language_code="en-US",
            name="en-US-Studio-O",
            ssml_gender=texttospeech.SsmlVoiceGender.FEMALE,)

audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3)

response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config)

with open("static/assets/speech.mp3", "wb") as out:
            out.write(response.audio_content)
            print('Audio content written to file "speech.mp3"')
    


# ssml = "<speak><prosody volume='x-soft' rate='88%'>Find a quiet and comfortable place where you won't be disturbed... <break time='1s'/> Sit down and close your eyes... <break time='1s'/> Take a deep breath in through your nose, and then exhale through your mouth, letting go of any tension... <break time='1s'/> As you continue to breathe, allow yourself to acknowledge and feel any sadness or pain you may be experiencing... <break time='1s'/> Notice where you feel this emotion in your body - is it in your chest, your stomach, or elsewhere?... <break time='1s'/> Imagine yourself holding this feeling in your hands, cradling it with compassion and understanding... <break time='1s'/> Visualize this feeling as a cloud of mist that you can breathe in and out with each breath... <break time='1s'/> With each inhale, allow the mist to fill your body and bring comfort and peace... <break time='1s'/> With each exhale, release any tension or pain that you may be holding onto... <break time='1s'/> Remember that it's okay to feel sad, and that this feeling will eventually pass... <break time='1s'/> Offer yourself kindness and support in this moment... <break time='1s'/> When you're ready, take a deep breath in, and then exhale fully, letting go of any remaining tension or discomfort... <break time='1s'/> Open your eyes and take a moment to ground yourself in your surroundings... <break time='1s'/> Remember that you can return to this meditation anytime you need to find comfort and support in your emotions...</prosody></speak>"

# synthesis_input = texttospeech.SynthesisInput(ssml=ssml)

# voice = texttospeech.VoiceSelectionParams(
#         language_code="en-GB",
#         name="en-GB-Neural2-D",
#         ssml_gender=texttospeech.SsmlVoiceGender.MALE,)

# audio_config = texttospeech.AudioConfig(
#         audio_encoding=texttospeech.AudioEncoding.MP3)

# response = client.synthesize_speech(
#         input=synthesis_input, voice=voice, audio_config=audio_config)

# with open("static/assets/speech.mp3", "wb") as out:
#         out.write(response.audio_content)
#         print('Audio content written to file "speech.mp3"')

# import openai
# openai.api_key = "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"


# input = input()

# completion = openai.ChatCompletion.create(model="gpt-3.5-turbo",messages=[
#         {"role": "system", "content": "Act as an ssml script generator for text-to-speech with the task of creating guided meditation based on how the user is feeling."},
#         {"role": "user", "content": "Generate a meditation script for ssml text to speech based on the following example. I will provide you with a specific emotion for the topic of the meditation:<speak><prosody volume='x-soft' rate='85%'>Find a quiet and comfortable place where you won't be disturbed... <break time='1s'/> Sit down and close your eyes... <break time='1s'/> Take a deep breath in through your nose, and then exhale through your mouth, letting go of any tension... <break time='1s'/> As you continue to breathe, allow yourself to acknowledge and feel any sadness or pain you may be experiencing... <break time='1s'/> Notice where you feel this emotion in your body - is it in your chest, your stomach, or elsewhere?...  <break time='1s'/>  Imagine yourself holding this feeling in your hands, cradling it with compassion and understanding...  <break time='1s'/>  Visualize this feeling as a cloud of mist that you can breathe in and out with each breath...  <break time='1s'/>  With each inhale, allow the mist to fill your body and bring comfort and peace...  <break time='1s'/>  With each exhale, release any tension or pain that you may be holding onto...  <break time='1s'/>  Remember that it's okay to feel sad, and that this feeling will eventually pass...  <break time='1s'/>  Offer yourself kindness and support in this moment...  <break time='1s'/> When you're ready, take a deep breath in, and then exhale fully, letting go of any remaining tension or discomfort...  <break time='1s'/>  Open your eyes and take a moment to ground yourself in your surroundings...  <break time='1s'/>  Remember that you can return to this meditation anytime you need to find comfort and support in your emotions...  </prosody></speak>"},
#         {"role": "assistant", "content": "What are the feelings you are experiencing?"},
#         {"role": "user", "content": "frustrated"},
#         {"role": "assistant", "content": "<speak><prosody volume='x-soft' rate='85%'> Find a quiet and comfortable place where you won't be disturbed... <break time='1s'/> Sit down and close your eyes... <break time='2s'/> Take a deep breath in through your nose, and then exhale through your mouth, letting go of any tension... <break time='1s'/> As you continue to breathe, allow yourself to acknowledge and feel any frustration you may be experiencing... <break time='1s'/> Notice where you feel this emotion in your body - is it in your chest, your head, or elsewhere?... <break time='1s'/> Imagine yourself holding this feeling in your hands, cradling it with compassion and understanding... <break time='1s'/> Visualise this feeling as a bright, glowing ball of energy that you can breathe in and out with each breath... <break time='2s'/> With each inhale, allow the ball of energy to enter your body and bring calm and relaxation... <break time='1s'/> With each exhale, release any tension or frustration that you may be holding onto... <break time='1s'/> Remember that it's okay to feel frustrated, and that this feeling will eventually pass... <break time='1s'/> Offer yourself kindness and support in this moment... <break time='1s'/> Now, visualise a peaceful place where you can go to relax and unwind... <break time='2s'/> Maybe it's a quiet beach, a forest, or a mountain top... <break time='1s'/> Take a moment to breathe in the peaceful surroundings and feel the calm wash over you... <break time='1s'/> When you're ready, take a deep breath in, and then exhale fully, letting go of any remaining frustration or discomfort... <break time='1s'/> Open your eyes and take a moment to ground yourself in your surroundings... <break time='1s'/> Remember that you can return to this meditation anytime you need to find peace and relaxation in your emotions... </prosody></speak>"},
#         {"role": "user", "content": input}
#         ])

# print(completion.choices[0].message)



  




