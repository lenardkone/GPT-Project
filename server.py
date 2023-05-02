from flask import Flask, send_from_directory, url_for
from views import views


app = Flask(__name__)
app.register_blueprint(views, url_prefix="/")


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


if __name__ == '__main__':
    app.run(debug=True,port=4000)


