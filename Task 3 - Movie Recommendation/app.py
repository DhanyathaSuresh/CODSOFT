from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

# Read dataset
df = pd.read_csv("dataset.csv")

@app.route("/", methods=["GET", "POST"])
def home():

    recommendations = []

    if request.method == "POST":

        genre = request.form["genre"]

        recommendations = df[df["genre"] == genre]["name"].tolist()

    return render_template(
        "index.html",
        recommendations=recommendations
    )

if __name__ == "__main__":
    app.run(debug=True)