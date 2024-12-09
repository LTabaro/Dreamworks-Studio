import React, { useState } from 'react';
import epicScene from '../assets/story-background.jpg'; 
import './AvatarGenerator.css';
import { Link } from 'react-router-dom';


const AvatarGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedAvatars, setSavedAvatars] = useState([]);

  const generateAvatar = async () => {
    setLoading(true);
    setError('');
    setImageUrl('');
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.data && data.data[0]?.url) {
        setImageUrl(data.data[0].url);
      } else {
        throw new Error('Failed to generate avatar.');
      }
    } catch (error) {
      setError('Error generating avatar. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAvatar = () => {
    if (imageUrl) {
      const newAvatar = { id: Date.now(), url: imageUrl, name: prompt || 'Unnamed Avatar' };
      const updatedAvatars = [...savedAvatars, newAvatar];
      setSavedAvatars(updatedAvatars);
      localStorage.setItem('myAvatars', JSON.stringify(updatedAvatars));
      // localStorage.clear(); // uncomment line this to clear local storage
    }
  };

  return (
    <div className="avatar-generator-container">
      <div className="background-layer">
        <img src={epicScene} alt="Background" className="background-image" />
      </div>
      <div className="overlay">
        <h1 className="title">
          Create <span>Your Character</span>
        </h1>
        <p className="subtitle">Design amazing avatars with endless possibilities!</p>

        <div className="generator-section">
          <input
            type="text"
            className="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your character (e.g., 'Princess in a magical forest')"
          />
          <button onClick={generateAvatar} disabled={loading} className="generate-button">
            {loading ? 'Creating...' : 'Generate Avatar'}
          </button>
        </div>
        <div className="generator-section">
          <Link to="/prompts">
            <button className="prompts-button">Get Inspired with Prompts</button>
          </Link>
        </div>

        {imageUrl && (
          <div className="generated-avatar">
            <h2 className="generated-title">Your Creation</h2>
            <img src={imageUrl} alt="Generated Avatar" className="avatar-display" />
            <div className="action-buttons">
              <button onClick={saveAvatar} className="action-button save">
                Save to Collection
              </button>
              <button
                onClick={() => window.open(imageUrl, '_blank')}
                className="action-button download"
              >
                Download Avatar
              </button>
            </div>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default AvatarGenerator;

