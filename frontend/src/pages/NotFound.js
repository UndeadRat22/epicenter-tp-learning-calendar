import React from 'react';
import {
  Box, EndorseContentLayout,
} from 'wix-style-react';

const NotFound = () => {
  return (
    <Box align="center" verticalAlign="middle" padding={2} margin={40}>
      <EndorseContentLayout
        head="Oops... Something Went Wrong"
        content="404 - Page not found"
      />
    </Box>
  );
};

export default NotFound;
