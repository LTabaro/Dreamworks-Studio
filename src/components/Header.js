import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="mb-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            AI Avatar Studio
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/create-avatar">
                  Create Your Own Avatar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/story-mode">
                  Story Mode
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-avatars">
                  My Avatars
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/prompts">
                  Prompts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;


