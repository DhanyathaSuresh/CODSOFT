from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

# ------------------------------
# Rule-Based Chatbot
# ------------------------------

def chatbot_response(message):
    msg = message.lower()

    responses = {
        "hi": "Hello! 👋 Welcome to Dino AI. How can I help you today?",
        "hello": "Hi there! 😊 Welcome to Dino AI.",
        "hey": "Hey! 👋 I'm Dino AI. How can I help?",
        "how are you": "I'm doing great! Thanks for asking. 😊",
        "your name": "I'm Dino AI 🤖, your personal chatbot.",
        "who created you": "I was created using Python and Flask.",
        "python": "Python is a powerful programming language used for AI, web development, automation, and data science.",
        "flask": "Flask is a lightweight Python web framework used for building web applications.",
        "html": "HTML is the standard markup language used to create web pages.",
        "css": "CSS is used to style and design web pages beautifully.",
        "javascript": "JavaScript makes websites interactive and dynamic.",
        "ai": "Artificial Intelligence enables machines to simulate human intelligence.",
        "machine learning": "Machine Learning is a branch of AI where computers learn from data.",
        "thank you": "You're welcome! 😊",
        "thanks": "Happy to help! ❤️",
        "bye": "Goodbye! Have a wonderful day! 👋"
    }

    for key in responses:
        if key in msg:
            return responses[key]

    if "time" in msg:
        return "🕒 Current time is " + datetime.now().strftime("%I:%M %p")

    if "date" in msg:
        return "📅 Today's date is " + datetime.now().strftime("%d-%m-%Y")

    return "🤔 Sorry, I don't understand that. Please try asking something else."

# ------------------------------
# Routes
# ------------------------------

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/get_response", methods=["POST"])
def get_response():

    data = request.get_json()

    user_message = data.get("message", "")

    bot_reply = chatbot_response(user_message)

    return jsonify({
        "response": bot_reply
    })


# ------------------------------
# Run App
# ------------------------------

if __name__ == "__main__":
    app.run(debug=True)