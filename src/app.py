from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import config

app = Flask(__name__)
CORS(app)

OPENAI_API_KEY = config.OPENAI_API_KEY
OPENAI_API_URL = "https://api.openai.com/v1/images/generations"

ELEVEN_LABS_API_KEY = config.ELEVEN_LABS_API_KEY
ELEVEN_LABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech"


@app.route('/generate-avatar', methods=['POST'])
def generate_avatar():
    data = request.json
    prompt = data.get('prompt', 'Generate a unique avatar for a game character.')

    response = requests.post(
        "https://api.openai.com/v1/images/generations",
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}"
        },
        json={
            "prompt": prompt,
            "n": 1,  
            "size": "512x512" 
        }
    )

    if response.status_code == 200:
        avatar_data = response.json()
        return jsonify(avatar_data)
    else:
        return jsonify({"error": "Failed to generate avatar", "details": response.json()}), 500



@app.route('/generate-story', methods=['POST'])
def generate_story():
    data = request.json
    storyline = data.get('storyline', 'Exploring a virtual casino city')  

   
    response = requests.post(
        "https://api.openai.com/v1/chat/completions",  
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}"
        },
        json={
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": "You are a creative assistant helping to write interactive quest stories."},
                {"role": "user", "content": f"Write a detailed quest story based on the theme: {storyline}."}
            ],
            "max_tokens": 1000
        }
    )

    if response.status_code == 200:
        story = response.json().get('choices', [{}])[0].get('message', {}).get('content', '')
        return jsonify({"story": story})
    else:
        return jsonify({"error": "Failed to generate story", "details": response.json()}), 500


@app.route('/narrate-story', methods=['POST'])
def narrate_story():
    data = request.json
    story = data.get('story', '')
    voice_id = data.get('voice_id', 'default')  

    if not story:
        return jsonify({"error": "Story text is required"}), 400


    response = requests.post(
        f"{ELEVEN_LABS_API_URL}/{voice_id}",  
        headers={
            "Authorization": f"Bearer {ELEVEN_LABS_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "text": story,
            "voice_settings": {
                "stability": 0.75,
                "similarity_boost": 0.75,
            }
        }
    )

    if response.status_code == 200:
        audio_content = response.content 
        with open("narration.mp3", "wb") as audio_file:
            audio_file.write(audio_content)
        return jsonify({"audio_url": "/narration.mp3"})
    else:
        return jsonify({"error": "Failed to generate narration", "details": response.json()}), 500



if __name__ == '__main__':
    app.run(debug=True)
