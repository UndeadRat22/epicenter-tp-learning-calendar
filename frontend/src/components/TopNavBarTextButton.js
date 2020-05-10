import React from 'react';
import { TextButton } from 'wix-style-react';
import { Link } from 'react-router-dom';

const TopNavBarTextButton = ({
  Icon, path, isCurrentPath, text,
}) => {
  return (
    <TextButton
      weight="normal"
      skin={isCurrentPath ? 'standard' : 'dark'}
      as={Link}
      to={path}
      style={{ paddingRight: '15px' }}
      underline="onHover"
      prefixIcon={Icon}
    >
      {text}
    </TextButton>
  );
};

export default TopNavBarTextButton;
