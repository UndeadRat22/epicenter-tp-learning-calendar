import React, { useState } from 'react';
import './Nav.global.scss';
import { Link } from 'react-router-dom';
import { Avatar, TextButton, Text } from 'wix-style-react';

function Nav() {
  const logoStyle = {
    color: '#B38A4C',
  };
  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <nav>
      <Text style={logoStyle}>Epicenter Learning Center</Text>
      <ul className="nav-links">
        <TextButton
          skin="premium"
          size="medium"
          weight="normal"
          as={Link}
          to="/home"
        >
          Home
        </TextButton>
        <TextButton
          skin="premium"
          size="medium"
          weight="normal"
          as={Link}
          to="/topics"
        >
          Topics
        </TextButton>
        <TextButton
          skin="premium"
          size="medium"
          weight="normal"
          as={Link}
          to="/myteam"
        >
          My team
        </TextButton>
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
