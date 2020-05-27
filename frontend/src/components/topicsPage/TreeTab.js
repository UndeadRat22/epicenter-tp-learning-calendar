import React, { useState } from 'react';
import {
  Container,
  Box,
  Heading,
} from 'wix-style-react';
import TreeContainer from './tree/TreeContainer';
import data from './tree/data';
import SelectTreeForm from './SelectTreeForm';
import { TOPICS_TREE_HEIGHT, TOPICS_TREE_WIDTH } from '../../constants/Styling';
import {
  PERSONAL, MY_TEAM, MY_SUBORDINATES, SINGLE_SUBORDINATE, SINGLE_TEAM,
} from '../../constants/TreeTypes';

const TreeTab = () => {
  const [tree, setTree] = useState(PERSONAL);

  const handleTree = selectedTree => {
    switch (selectedTree) {
      case SINGLE_SUBORDINATE:
        setTree(selectedTree.value);
        break;
      case SINGLE_TEAM:
        setTree(selectedTree.value);
        break;
      default:
        setTree(selectedTree.value);
    }
  };

  return (
    <Container fluid>
      <SelectTreeForm onSelect={selectedTree => handleTree(selectedTree)} />
      <Box align="center" padding="medium" margin={2}>
        <Heading
          appearance="H2"
        >
          {tree}
          {' '}
          tree
        </Heading>
      </Box>
      <Box align="center">
        <TreeContainer data={data} width={TOPICS_TREE_WIDTH} height={TOPICS_TREE_HEIGHT} />
      </Box>
    </Container>
  );
};

export default TreeTab;
