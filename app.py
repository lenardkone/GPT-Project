#This Python file imports the flask framework and creates a new Application that is routed to the views.py file 

from flask import Flask, send_from_directory, url_for
from views import views


app = Flask(__name__)
app.register_blueprint(views, url_prefix="/")


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

# Here I define the port for running on my local server
if __name__ == '__main__':
    app.run(debug=True,port=4000)


