import React, { useState } from 'react';
import floatingHero1 from '../assets/flash.png';
import floatingHero2 from '../assets/batman.png';
import floatingHero3 from '../assets/hulk.png';
import floatingHero4 from '../assets/thor.png';
import floatingHero5 from '../assets/spiderman.png';
import './StoryMode.css';

const StoryGenerator = () => {
  const [selectedStoryline, setSelectedStoryline] = useState('');
  const [customStoryline, setCustomStoryline] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('default'); 
  const [audioUrl, setAudioUrl] = useState('');

  const suggestedStorylines = [
    'The Celestial Knight’s Quest',
    'A Forgotten Kingdom Reborn',
    'The Space Pirate’s Treasure Hunt',
    'Escape from the Shadow Realm',
    'Unite the Elemental Guardians',
  ];

  const voices = [
    { id: 'default', name: 'Default Voice' },
    { id: 'voice_id_1', name: 'Expressive Voice 1' },
    { id: 'voice_id_2', name: 'Expressive Voice 2' },
    { id: 'voice_id_3', name: 'Child-Friendly Voice' },
  ];

  const generateStory = async () => {
    setLoading(true);
    setError('');
    setStory('');
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storyline: customStoryline || selectedStoryline,
        }),
      });
      const data = await response.json();
      if (data.story) {
        setStory(data.story);
      } else {
        throw new Error('Failed to generate story.');
      }
    } catch (error) {
      setError('Error generating story. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const narrateStory = async () => {
    if (!story) return;

    try {
      const response = await fetch('http://127.0.0.1:5000/narrate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          story,
          voice_id: selectedVoice,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAudioUrl(`http://127.0.0.1:5000${data.audio_url}`); 
        const audio = new Audio(`http://127.0.0.1:5000${data.audio_url}`);
        audio.play();
      } else {
        throw new Error('Failed to narrate story.');
      }
    } catch (error) {
      setError('Error narrating story. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="story-mode-container">
      <div className="floating-heroes">
        <img src={floatingHero1} alt="Hero 1" className="floating-hero top-left" />
        <img src={floatingHero2} alt="Hero 2" className="floating-hero top-right" />
        <img src={floatingHero3} alt="Hero 3" className="floating-hero bottom-left" />
        <img src={floatingHero4} alt="Hero 4" className="floating-hero bottom-right" />
        <img src={floatingHero5} alt="Hero 5" className="floating-hero middle-left" />
      </div>

      <div className="content-overlay">
        <h1 className="title">UNLEASH YOUR IMAGINATION</h1>
        <p className="subtitle">Create breathtaking adventures for your heroes!</p>

        <div className="story-options">
          <h2>Epic Storylines</h2>
          <div className="storyline-buttons">
            {suggestedStorylines.map((line) => (
              <button
                key={line}
                className={`storyline-button ${
                  selectedStoryline === line ? 'selected' : ''
                }`}
                onClick={() => {
                  setSelectedStoryline(line);
                  setCustomStoryline('');
                }}
              >
                {line}
              </button>
            ))}
          </div>
          <h3>Or Craft Your Own</h3>
          <input
            type="text"
            placeholder="Write your own story idea"
            value={customStoryline}
            onChange={(e) => {
              setCustomStoryline(e.target.value);
              setSelectedStoryline('');
            }}
            className="custom-input"
          />
          <button
            className="generate-button"
            onClick={generateStory}
            disabled={loading || (!selectedStoryline && !customStoryline)}
          >
            {loading ? 'Weaving Magic...' : 'Generate Story'}
          </button>
        </div>

        {story && (
          <div className="story-output">
            <h2>Your Story Awaits</h2>
            <p>{story}</p>
            <h3>Select Voice:</h3>
            <select
              className="voice-select"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
            >
              {voices.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
            <button className="narrate-button" onClick={narrateStory}>
              Narrate Story
            </button>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default StoryGenerator;
