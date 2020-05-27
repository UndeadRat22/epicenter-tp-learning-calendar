import React, { useState } from 'react';
import {
  Container,
  Box,
  Heading,
} from 'wix-style-react';
import Tree from './tree/Tree';
import data from './tree/data';
import SelectTreeForm from './SelectTreeForm';
import { TOPICS_TREE_HEIGHT, TOPICS_TREE_WIDTH } from '../../constants/Styling';
import {
  PERSONAL, MY_TEAM, MY_SUBORDINATES, SPECIFIC_SUBORDINATE, SPECIFIC_TEAM,
} from '../../constants/TreeTypes';

const TreeTab = () => {
  const [tree, setTree] = useState(PERSONAL);

  const handleTree = selectedTree => {
    switch (selectedTree) {
      case SPECIFIC_SUBORDINATE:
        setTree(selectedTree.value);
        //
        break;
      case SPECIFIC_TEAM:
        setTree(selectedTree.value);
        //
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
        <Tree data={data} width={TOPICS_TREE_WIDTH} height={TOPICS_TREE_HEIGHT} />
      </Box>
    </Container>
  );
};

export default TreeTab;
