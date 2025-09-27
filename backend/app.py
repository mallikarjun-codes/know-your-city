# IMPORTS at the top - add os and openai
import os
import openai
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv() # This line loads the variables from your .env file

# APP SETUP - no changes here
app = Flask(__name__)
CORS(app)

# Load the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise ValueError("OpenAI API key not found. Make sure it's in your .env file.")

# HEALTH CHECK ENDPOINT - no changes here
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Backend is running!"})

# QUERY ENDPOINT - THIS IS THE UPGRADE
@app.route('/api/query', methods=['POST'])
def handle_query():
    data = request.get_json()
    user_query = data.get('query')
    print(f"RECEIVED QUERY: {user_query}")

    try:
        # Make the call to the OpenAI API
        completion = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful local guide for the city of Belagavi, India. Provide concise and useful answers."},
                {"role": "user", "content": user_query}
            ]
        )
        
        ai_response = completion.choices[0].message.content
        print(f"AI RESPONSE: {ai_response}")

        # Send the AI's response back to the frontend
        return jsonify({"response": ai_response})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to get response from AI"}), 500

# APP RUNNER - no changes here
if __name__ == '__main__':
    app.run(debug=True)