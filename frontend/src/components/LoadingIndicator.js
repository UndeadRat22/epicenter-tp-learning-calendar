import React from 'react';
import { Loader } from 'wix-style-react';

const LoadingIndicator = ({ text }) => {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    >
      <Loader text={text} size="large" />
    </div>
  );
};

export default LoadingIndicator;
