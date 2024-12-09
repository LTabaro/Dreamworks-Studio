import React, { useState } from 'react';
import './Prompts.css'; 

import vikingImage from '../assets/viking.png';
import hobbitImage from '../assets/Hobbit.png';
import elfImage from '../assets/Elf.png';
import jediImage from '../assets/Jedi.png';
import astronautImage from '../assets/Astronaut.png';
import ninjaImage from '../assets/Ninja.png';
import samuraiImage from '../assets/Samurai.png';
import superheroImage from '../assets/Hero.png';
import knightImage from '../assets/knight.png';

const Prompts = () => {
  const [customPrompts, setCustomPrompts] = useState([]);
  const [newPromptTitle, setNewPromptTitle] = useState('');
  const [newPromptText, setNewPromptText] = useState('');

  const defaultPrompts = [
    {
      id: 1,
      title: 'Viking',
      text: 'game avatar of a viking, ultra realistic, concept art, intricate details, powerful and fierce...',
      image: vikingImage,
    },
    {
      id: 2,
      title: 'Hobbit',
      text: 'game avatar of a Hobbit, small, big brown eyes, green and brown clothing...',
      image: hobbitImage,
    },
    {
      id: 3,
      title: 'Elf',
      text: 'game avatar of an elf with long blond hair, fantasy concept art, intricate details...',
      image: elfImage,
    },
    {
      id: 4,
      title: 'Jedi',
      text: 'game avatar of a jedi with a lightsaber, highly detailed, science fiction...',
      image: jediImage,
    },
    {
      id: 5,
      title: 'Astronaut',
      text: 'game avatar of an astronaut, futuristic, highly detailed, ultra realistic...',
      image: astronautImage,
    },
    {
      id: 6,
      title: 'Ninja',
      text: 'game avatar of a ninja, wearing a black hood and suit, stealthy movements...',
      image: ninjaImage,
    },
    {
      id: 7,
      title: 'Samurai',
      text: 'game avatar of a samurai warrior, war-torn landscape in the background...',
      image: samuraiImage,
    },
    {
      id: 8,
      title: 'Superhero',
      text: 'game avatar of a superhero, dynamic lighting, intense colors, detailed costume...',
      image: superheroImage,
    },
    {
      id: 9,
      title: 'Knight',
      text: 'game avatar of a knight wearing a full suit of armor, intricate details...',
      image: knightImage,
    },
  ];

  const handleAddPrompt = () => {
    if (newPromptTitle && newPromptText) {
      const newPrompt = {
        id: Date.now(),
        title: newPromptTitle,
        text: newPromptText,
        image: null, 
      };
      setCustomPrompts([...customPrompts, newPrompt]);
      setNewPromptTitle('');
      setNewPromptText('');
    }
  };

  return (
    <div className="prompts-container">
      <h1 className="page-title">AI Prompts Inspiration</h1>
      <p className="page-description">
        Our AI prompts cover a wide range of themes to inspire your creativity. 
      </p>

      <div className="prompt-list">
        {[...defaultPrompts, ...customPrompts].map((prompt) => (
          <div key={prompt.id} className="prompt-card">
            <div className="prompt-image-container">
              {prompt.image ? (
                <img src={prompt.image} alt={prompt.title} className="prompt-image" />
              ) : (
                <div className="placeholder-image">+</div>
              )}
            </div>
            <div className="prompt-details">
              <h3 className="prompt-title">{prompt.title}</h3>
              <p className="prompt-text">{prompt.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="add-prompt-section">
        <h2>Add Your Own Prompt</h2>
        <input
          type="text"
          placeholder="Prompt Title"
          value={newPromptTitle}
          onChange={(e) => setNewPromptTitle(e.target.value)}
          className="input-title"
        />
        <textarea
          placeholder="Prompt Details"
          value={newPromptText}
          onChange={(e) => setNewPromptText(e.target.value)}
          className="input-text"
        ></textarea>
        <button onClick={handleAddPrompt} className="add-button">
          Add Prompt
        </button>
      </div>
    </div>
  );
};

export default Prompts;
