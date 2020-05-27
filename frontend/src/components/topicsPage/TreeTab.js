import React, { useState } from 'react';
import {
  Container,
  Box,
  Heading,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import TreeContainer from './tree/TreeContainer';
import SelectTreeForm from './SelectTreeForm';
import { TOPICS_TREE_HEIGHT, TOPICS_TREE_WIDTH } from '../../constants/Styling';
import {
  PERSONAL, MY_TEAM, MY_SUBORDINATES, SINGLE_SUBORDINATE, SINGLE_TEAM,
} from '../../constants/TreeTypes';
import {
  getPersonalTree, getMyTeamTree, getMySubordinatesTree, getSingleSubordinateTree, getSingleTeamTree,
} from '../../state/actions';

const TreeTab = () => {
  const initialTree = {
    name: 'Topics',
    children: [],
  };

  const [id, setId] = useState('');
  const [tree, setTree] = useState(initialTree);
  const [treeName, setTreeName] = useState('');

  const dispatch = useDispatch();

  const { tree: personalTree, status: personalTreeStatus } = useSelector(state => state.personalTree);
  const { tree: myTeamTree, status: myTeamTreeStatus } = useSelector(state => state.myTeamTree);
  const { tree: mySubordinatesTree, status: mySubordinatesTreeStatus } = useSelector(state => state.mySubordinatesTree);
  const { tree: singleSubordinateTree, status: singleSubordinateTreeStatus } = useSelector(state => state.singleSubordinateTree);
  const { tree: singleTeamTree, status: singleTeamTreeStatus } = useSelector(state => state.singleTeamTree);

  const reformatDataToTree = data => {
    const newTree = {
      name: 'Topics',
      children: data,
    };
    setTree(newTree);
  };

  const handleTree = async ({ value, additionalParametersId }) => {
    setTreeName(value);
    setId(additionalParametersId);

    switch (value) {
      case PERSONAL:
        dispatch(getPersonalTree());
        reformatDataToTree(personalTree);
        break;
      case MY_TEAM:
        dispatch(getMyTeamTree());
        reformatDataToTree(myTeamTree);
        break;
      case MY_SUBORDINATES:
        dispatch(getMySubordinatesTree());
        reformatDataToTree(mySubordinatesTree);
        break;
      case SINGLE_SUBORDINATE:
        dispatch(getSingleSubordinateTree(additionalParametersId));
        reformatDataToTree(singleSubordinateTree);
        break;
      case SINGLE_TEAM:
        dispatch(getSingleTeamTree(additionalParametersId));
        reformatDataToTree(singleTeamTree);
        break;
      default:
    }
  };

  return (
    <Container fluid>
      <SelectTreeForm onSelect={selectedTree => handleTree(selectedTree)} />
      <Box align="center" padding="medium" margin={2}>
        <Heading
          appearance="H2"
        >
          {treeName}
          {' '}
          Tree
        </Heading>
      </Box>
      <Box align="center">
        <TreeContainer data={tree} width={TOPICS_TREE_WIDTH} height={TOPICS_TREE_HEIGHT} />
      </Box>
    </Container>
  );
};

export default TreeTab;
