import React, { useState } from 'react';
import '../App.global.scss';
import { Link } from 'react-router-dom';
import { Avatar } from 'wix-style-react';

function Nav() {
  const navStyle = {
    color: '#252525',
  };
  const logoStyle = {
    color: '#B38A4C',
  };
  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <nav>
      <h3 style={logoStyle}>Epicenter Learning Center</h3>
      <ul className="nav-links">
        <Link style={navStyle} to="/home">
          <li>Home</li>
        </Link>
        <Link style={navStyle} to="/topics">
          <li>Topics</li>
        </Link>
        <Link style={navStyle} to="/myteam">
          <li>My Team</li>
        </Link>
        <Link to="/profile">
          {profilePicture ? (
            <Avatar
              imgProps={{
                src: 'https://randomuser.me/api/portraits/women/39.jpg',
              }}
              onClick={() => console.log('Avatar click!')}
            />
          ) : (
            <Avatar
              name="Aurelija Cyg"
              color="A6"
              onClick={() => console.log('Avatar click!')}
            />
          )}
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
