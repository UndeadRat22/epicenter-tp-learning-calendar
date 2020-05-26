import React, { useState } from 'react';
import {
  Container,
  Dropdown,
  Box,
} from 'wix-style-react';
import {
  PERSONAL, MY_TEAM, MY_SUBORDINATES, SPECIFIC_SUBORDINATE, SPECIFIC_TEAM,
} from '../../constants/TreeTypes';
import {
  FETCH_SUBORDINATES_SUCCEEDED, FETCH_SUBORDINATES_FAILED,
} from '../../constants/SubordinatesStatus';

const SelectTreeForm = ({ onSelect }) => {
  const [selectedTree, setSelectedTree] = useState(PERSONAL);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleDropdownSelect = e => {
    setSelectedTree(e.id);
  };

  return (
    <Container fluid>
      <Box align="center">
        <Dropdown
          placeholder="Select tree"
          options={[
            { id: 0, value: PERSONAL },
            { id: 1, value: MY_TEAM },
            { id: 2, value: MY_SUBORDINATES },
            { id: 3, value: SPECIFIC_SUBORDINATE },
            { id: 4, value: SPECIFIC_TEAM },
          ]}
          onSelect={event => handleDropdownSelect(event)}
        />
      </Box>
    </Container>
  );
};

export default SelectTreeForm;
