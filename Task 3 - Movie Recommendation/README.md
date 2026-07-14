# Task 3 - Movie Recommendation System 🎬🤖

This project is part of my **Artificial Intelligence Internship at CodSoft**.

In this task, I developed a **website-based Movie Recommendation System** that suggests movies to users based on their selected preferences. The system runs directly in the browser and recommends movies from a dataset according to the user's chosen genre.

The recommendation system uses **Content-Based Filtering**, where movies are recommended based on their content (genre). This provides users with personalized movie suggestions quickly and efficiently.

---

## 🎯 Objective

To implement a **Movie Recommendation System** as an interactive website using the **Content-Based Filtering** technique.

The system compares the user's preferred movie genre with the movie dataset and recommends all matching movies.

---

## 📂 Project Structure

```text
Task 3 - Movie Recommendation System/
├── app.py
├── dataset.csv
├── templates/
│   └── index.html
├── static/
│   └── style.css
└── README.md
```

---

## 🛠️ Technologies Used

* Python
* Flask
* HTML
* CSS
* Pandas
* Content-Based Filtering

---

## 🔄 System Flow

1. The website opens in the browser.
2. The user selects a movie genre.
3. The recommendation request is sent to the Flask application.
4. The application reads the movie dataset.
5. Movies with the selected genre are filtered.
6. Recommended movies are displayed on the webpage.

---

## 💡 Features

* Website-based recommendation system
* Genre-based movie recommendations
* Content-Based Filtering
* Large movie dataset
* Simple and responsive user interface
* Fast recommendation results

---

## 🎬 Sample Output

```text
Movie Recommendation System

Select Genre:
[ Action ▼ ]

[ Recommend Movies ]

Recommended Movies

• Avengers
• John Wick
• The Dark Knight
• Iron Man
• Mission Impossible
• Mad Max: Fury Road
```

---

## 🚀 How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/DhanyathaSuresh/CODSOFT.git
```

### 2. Open the Project Folder

```bash
cd "CODSOFT/Task 3 - Movie Recommendation System"
```

### 3. Install Dependencies

```bash
pip install flask pandas
```

### 4. Run the Application

```bash
python app.py
```

### 5. Open the Website

Open the following URL in your browser:

```text
http://127.0.0.1:5000
```

---

## 🧠 Algorithm Used

The recommendation system uses **Content-Based Filtering**.

The algorithm compares the user's selected genre with the genres available in the movie dataset.

### Algorithm

1. Load the movie dataset.
2. Display available movie genres.
3. Accept the user's selected genre.
4. Compare the selected genre with each movie.
5. Retrieve all movies with matching genres.
6. Display the recommended movies.

---

## 📌 Expected Output

* The website opens successfully.
* The user selects a movie genre.
* The system recommends movies matching the selected genre.
* Recommendations are displayed instantly.

---

## 📹 Demo Video

Not added.

---

## 👩‍💻 Author

**Name:** S Dhanyatha

**GitHub:** https://github.com/DhanyathaSuresh

**LinkedIn:** https://www.linkedin.com/in/dhanyatha-suresh-770ba6325?utm_source=share_via&utm_content=profile&utm_medium=member_android

---

## 🔖 Hashtags

`#CodSoft` `#ArtificialIntelligence` `#Python` `#Flask` `#HTML` `#CSS` `#RecommendationSystem` `#MovieRecommendation` `#ContentBasedFiltering` `#Internship`

---

## 🙏 Acknowledgement

Special thanks to **CodSoft** for providing this internship opportunity and helping me learn Artificial Intelligence through practical projects.
