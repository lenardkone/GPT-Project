OutputGPT = "Null"
userPrompt = "Null"


from flask import Blueprint, render_template, request, jsonify
import openai

openai.api_key = "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"



views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template("index.html")

@views.route("/submit", methods=['POST'])
def submit():
    userPrompt = request.form['text_input']

    messagePrompt = userPrompt + "Give an answer in a maximum of 40 words."
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": messagePrompt}])
    OutputGPT= completion.choices[0].message.content
    
    print(OutputGPT) 
    return jsonify(OutputGPT=OutputGPT, userPrompt=userPrompt)
    


  




