from flask import Flask, request, jsonify
from flask_cors import CORS
import praw
import joblib
import re
import string
import requests

app = Flask(__name__)
CORS(app)

# Load the trained SVM model and vectorizer
svm_model = joblib.load("svm_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Initialize Reddit API
reddit = praw.Reddit(
    client_id="wOlmv9zcU7MHK_4hSn5H3A",
    client_secret="CC5B1a2X3nh_up_sXBtpmIYxMHYI8g",
    user_agent="my_reddit_script by u/puffingdragon1"
)

# Function to clean and preprocess text
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    return text

# Function to predict sentiment
def predict_sentiment(text):
    cleaned_text = preprocess_text(text)
    vectorized_text = vectorizer.transform([cleaned_text])
    prediction = svm_model.predict(vectorized_text)[0]

    if prediction == 1:
        return "Positive 😊", 1
    elif prediction == -1:
        return "Negative 😞", -1
    else:
        return "Neutral 😐", 0

# Function to fetch motivational quote
def get_motivational_quote():
    api_url = 'https://qapi.vercel.app/api/random'
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()
        return {"quote": data.get("quote"), "author": data.get("author")}
    except requests.exceptions.RequestException:
        return {"quote": "Stay strong. Better days are coming.", "author": "Unknown"}
def get_recommendation(sentiment_score):
    if sentiment_score > 0.75:
        status = "🌟 Radiant Positivity 🌟"
        campaign = "Spread Your Light!"
        recommendations = [
            "🎉 Celebrate Your Joy: Take a moment to acknowledge and celebrate your happiness.",
            "🌍 Share Positivity: Brighten someone else's day—compliment a friend or volunteer.",
            "🎯 Set a Big Goal: Channel your positive energy into a meaningful goal.",
            "💡 Reflect and Grow: Reflect on how you achieved this state of mind."
        ]
    elif 0.5 <= sentiment_score <= 0.75:
        status = "😊 Positive Vibes 😊"
        campaign = "Cultivate Happiness!"
        recommendations = [
            "🌿 Practice Gratitude: Write down 3 things you're grateful for today.",
            "🧘 Mindful Moments: Spend 10 minutes meditating or practicing deep breathing.",
            "🎨 Creative Expression: Engage in a creative activity like painting or writing.",
            "💬 Connect with Others: Share your positive energy by reaching out to a friend."
        ]
    elif -0.5 <= sentiment_score < 0.5:
        status = "😐 Balanced and Calm 😐"
        campaign = "Nurture Your Balance!"
        recommendations = [
            "🌱 Self-Care Rituals: Take a warm bath, read a book, or enjoy a cup of tea.",
            "📝 Journal Your Thoughts: Write about your day and identify what brought you peace.",
            "🚶 Move Your Body: Go for a short walk or do light stretching.",
            "🌟 Explore New Interests: Try a new hobby or activity."
        ]
    elif -0.75 <= sentiment_score < -0.5:
        status = "😔 Feeling Low 😔"
        campaign = "Rise Above the Clouds!"
        recommendations = [
            "🌈 Small Wins: Focus on completing one small task today.",
            "🗣 Talk It Out: Share your feelings with a trusted friend or family member.",
            "📖 Inspirational Read: Read a motivational quote or short story.",
            "🎶 Music Therapy: Listen to uplifting music or a calming playlist."
        ]
    else:
        status = "😢 Overwhelmed 😢"
        campaign = "You’re Not Alone!"
        recommendations = [
            "🧘 Ground Yourself: Practice the 5-4-3-2-1 grounding exercise.",
            "📲 Seek Support: Reach out to a mental health professional or helpline.",
            "📝 Express Yourself: Write down your feelings in your FeelSync Mental Diary.",
            "🌳 Nature Break: Spend 10 minutes outside in nature."
        ]

    recommendation_message = "\n".join(recommendations)
    return f"*Status:* {status}\n\n*Campaign:* {campaign}\n\n*Recommendations:*\n{recommendation_message}"

# Function to fetch Reddit user data
@app.route('/reddit-user-info', methods=['POST'])
def reddit_user_info():
    data = request.json
    username = data.get('username')
    if not username:
        return jsonify({"error": "Username is required"}), 400

    user = reddit.redditor(username)
    user_info = {
        "username": user.name,
        "post_karma": user.link_karma,
        "comment_karma": user.comment_karma
    }

    total_score = 0
    sentiment_count = 0

    recent_posts = []
    for post in user.submissions.new(limit=5):
        sentiment, score = predict_sentiment(post.selftext) if post.selftext else ("N/A", 0)
        recent_posts.append({
            "title": post.title,
            "subreddit": str(post.subreddit),
            "upvotes": post.score,
            "content": post.selftext[:200] if post.selftext else post.url,
            "sentiment": sentiment
        })
        total_score += score
        sentiment_count += 1

    recent_comments = []
    for comment in user.comments.new(limit=5):
        sentiment, score = predict_sentiment(comment.body)
        recent_comments.append({
            "content": comment.body[:200],
            "subreddit": str(comment.subreddit),
            "upvotes": comment.score,
            "sentiment": sentiment
        })
        total_score += score
        sentiment_count += 1

    avg_sentiment = total_score / sentiment_count if sentiment_count else 0
    recommendation = get_recommendation(avg_sentiment)
    # Get motivational quote
    quote = get_motivational_quote()

    return jsonify({
        "user_info": user_info,
        "recent_posts": recent_posts,
        "recent_comments": recent_comments,
        "recommendation": recommendation,
        "sentiment_score": avg_sentiment,
        "quote": quote
    })

if __name__ == '__main__':
    app.run(debug=True)
