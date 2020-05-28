import React from 'react';
import {
  Box, FormField, Palette,
} from 'wix-style-react';
import {
  TREE_NODE_LEARNED_COLOR, TREE_NODE_NOT_PLANNED_COLOR, TREE_NODE_PLANNED_COLOR, TREE_NODE_BADGE_COLOR,
} from '../../constants/Styling';

const ColorsContainer = () => {
  return (
    <Box verticalAlign="bottom" padding="small" marginBottom="small">
      <FormField label="Learned | Planned | Not planned" labelPlacement="right">
        <Box height="25px" width="200px">
          <Palette
            fill={[
              TREE_NODE_LEARNED_COLOR,
              TREE_NODE_PLANNED_COLOR,
              TREE_NODE_NOT_PLANNED_COLOR,
            ]}
          />
        </Box>
      </FormField>
      <FormField label="LEARNED | PLANNED" labelPlacement="right">
        <Box height="25px" width="25px" marginLeft="medium">
          <Palette
            fill={[
              TREE_NODE_BADGE_COLOR,
            ]}
          />
        </Box>
      </FormField>
    </Box>
  );
};

export default ColorsContainer;
