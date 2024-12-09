import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-theme.jpg'; 
import avatarCreation from '../assets/ai-avatar.png';
import epicStorylines from '../assets/immersive-story-4.png';
import customizationOptions from '../assets/adventure.png';
import shareAdventure from '../assets/share-friends-1.png';
import './Homepage.css';

const Homepage = () => {
  return (
    <div style={{ backgroundColor: '#1e1e2f', color: '#f9f9f9', minHeight: '100vh' }}>
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h1 className="fadeInDown" style={{ fontSize: '3.5rem', textShadow: '2px 2px 8px #000' }}>
        Ignite Your Imagination
        </h1>
        <p className="fadeInUp" style={{ fontSize: '1.8rem', margin: '20px 0', textShadow: '1px 1px 5px #000' }}>
          Create Stunning Studio-Grade AI Generated Magical Characters for Endless Adventures
        </p>
        <Link to="/create-avatar">
          <button className="cta-button">
            Begin Your Journey
          </button>
        </Link>
      </div>

      <div style={{ padding: '50px 20px', textAlign: 'center' }}>
        <div className="features-container">
          <div className="feature-card">
            <img src={avatarCreation} alt="Avatar Creation" className="feature-icon" />
            <h3>Legendary Avatar Creation</h3>
            <p>Design unique avatars that stand out in any realm.</p>

          </div>
          <div className="feature-card">
            <img src={epicStorylines} alt="Epic Storylines" className="feature-icon" />
            <h3>Epic Storylines</h3>
            <p>Immerse in captivating, imaginative adventures.</p>
          </div>
          <div className="feature-card">
            <img src={customizationOptions} alt="Customization" className="feature-icon" />
            <h3>Unlimited Customization</h3>
            <p>Choose from fantastical themes and styles.</p>
          </div>
          <div className="feature-card">
            <img src={shareAdventure} alt="Sharing" className="feature-icon" />
            <h3>Share Your Adventure</h3>
            <p>Showcase your characters with family and friends.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2 style={{ fontSize: '2.2rem', marginBottom: '15px' }}>
          Join Thousands Embarking on Epic Journeys
        </h2>
        <Link to="/create-avatar">
          <button className="cta-button-secondary">
           Start Your Adventure Now
          </button>
        </Link>
      </div>

      <footer className="footer">
        <p>&copy; 2024 AI Avatar Studio. All rights reserved.</p>
        <p>
          <Link to="/terms" style={{ color: '#ccc', textDecoration: 'none' }}>
            Terms & Conditions
          </Link>{' '}
          |{' '}
          <Link to="/privacy" style={{ color: '#ccc', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Homepage;

