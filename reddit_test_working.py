import streamlit as st
import praw
import joblib
import re
import string
import requests
import subprocess
# Load the trained SVM model and vectorizer
svm_model = joblib.load("D:\\hack_proj_mental_health_assistant\\svm_model.pkl")
vectorizer = joblib.load("D:\\hack_proj_mental_health_assistant\\vectorizer.pkl")

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

def get_recommendation(sentiment_score):
    """
    Provides personalized recommendations based on the sentiment score.

    Parameters:
        sentiment_score (float): Sentiment score representing the user's emotional state (range: -1 to 1).

    Returns:
        str: Personalized mental health recommendations with status and campaign.
    """
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

    # Format the recommendation message
    recommendation_message = "\n".join(recommendations)
    return f"*Status:* {status}\n\n*Campaign:* {campaign}\n\n*Recommendations:*\n{recommendation_message}"

def generate_recommendations(sentiment_score):
    """
    Displays personalized mental health recommendations based on sentiment analysis.

    Parameters:
        sentiment_score (float): Sentiment score (range: -1 to 1).
    """
    st.subheader("🧠 Mental Health Recommendations")

    # Get detailed recommendations
    recommendation_message = get_recommendation(sentiment_score)

    # Display recommendations
    st.write(recommendation_message)

# Function to display a motivational quote
def display_motivational_quote():
    st.subheader("🌟 Daily Motivation")

    api_url = 'https://qapi.vercel.app/api/random'

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()

        quote = data.get('quote')
        author = data.get('author')

        st.markdown(f"""
            <div style='padding: 20px; border-left: 5px solid #4CAF50; background-color: #f9f9f9;'>
                <h3 style='color: #2e7d32;'>{quote}</h3>
                <p style='text-align: right; font-style: italic; color: #555;'>- {author}</p>
            </div>
            """, unsafe_allow_html=True)

    except requests.exceptions.RequestException as error:
        st.error("⚠️ Error fetching quote. Please try again later.")

# Function to extract user info and analyze recent 10 posts and comments
def extract_user_info(username):
    user = reddit.redditor(username)

    st.subheader("👤 User Information")
    st.write(f"**Username:** {user.name}")
    st.write(f"**Post Karma:** {user.link_karma}, **Comment Karma:** {user.comment_karma}")

    total_score = 0
    sentiment_count = 0

    st.subheader("📝 Recent 10 Posts")
    for post in user.submissions.new(limit=10):
        st.write(f"**Title:** {post.title}")
        st.write(f"Subreddit: {post.subreddit}, Upvotes: {post.score}")

        if post.selftext:
            st.write(f"📜 Content: {post.selftext[:300]}...")
            sentiment, score = predict_sentiment(post.selftext)
            st.write(f"**Sentiment:** {sentiment}")
            total_score += score
            sentiment_count += 1
        else:
            st.write(f"🔗 URL: {post.url}")

    st.subheader("💬 Recent 10 Comments")
    for comment in user.comments.new(limit=10):
        st.write(f"- {comment.body[:300]}...")
        sentiment, score = predict_sentiment(comment.body)
        st.write(f"**Sentiment:** {sentiment}, **In:** {comment.subreddit}, **Upvotes:** {comment.score}")
        total_score += score
        sentiment_count += 1

    # Calculate and display sentiment score
    sentiment_score = total_score / sentiment_count if sentiment_count else 0
    st.subheader("📊 Sentiment Score")
    st.write(f"{sentiment_score:.2f}")

    # Generate mental health recommendations
    generate_recommendations(sentiment_score)

    # Display motivational quote
    display_motivational_quote()

# Streamlit UI
st.title("🔍 Reddit Sentiment Analyzer")
username = st.text_input("Enter Reddit Username:")

if st.button("Analyze Sentiment") and username:
    extract_user_info(username)
def run_tkinter_app():
    subprocess.Popen(['python', 'D:\\hack_proj_mental_health_assistant\\breathing_game.py'])

st.title("🌱 Breathing Game in Streamlit")

st.write("Take a deep breath, relax, and grow your virtual plant!")

if st.button("Start Breathing Game"):
    run_tkinter_app()
    st.success("The Breathing Game is running! Check the new window.")