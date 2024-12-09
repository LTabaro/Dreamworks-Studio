import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AvatarGenerator from './components/AvatarGenerator';
import StoryGenerator from './components/StoryGenerator';
import MyAvatars from './components/MyAvatars';
import Prompts from './components/Prompts';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-avatar" element={<AvatarGenerator />} />
        <Route path="/story-mode" element={<StoryGenerator />} />
        <Route path="/my-avatars" element={<MyAvatars />} />
        <Route path="/prompts" element={<Prompts />} />
      </Routes>
    </Router>
  );
}

export default App;



