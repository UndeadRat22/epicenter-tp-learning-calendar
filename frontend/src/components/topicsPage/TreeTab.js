/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  Loader,
  InfoIcon,
  Palette,
  FormField,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import useWindowSize from '../../useWindowSize';
import TreeContainer from './tree/TreeContainer';
import SelectTreeForm from './SelectTreeForm';
import {
  TOPICS_TREE_HEIGHT, TOPICS_TREE_WIDTH, TREE_NODE_LEARNED_COLOR, TREE_NODE_NOT_PLANNED_COLOR, TREE_NODE_PLANNED_COLOR, TREE_NODE_BADGE_COLOR,
} from '../../constants/Styling';
import {
  PERSONAL, MY_TEAM, MY_SUBORDINATES, SINGLE_SUBORDINATE, SINGLE_TEAM,
} from '../../constants/TreeTypes';
import {
  getPersonalTree, getMyTeamTree, getMySubordinatesTree, getSingleSubordinateTree, getSingleTeamTree,
} from '../../state/actions';
import { LOADING_PERSONAL_TREE, FETCH_PERSONAL_TREE_SUCCEEDED } from '../../constants/PersonalTreeStatus';
import { LOADING_MY_TEAM_TREE, FETCH_MY_TEAM_TREE_SUCCEEDED } from '../../constants/MyTeamTreeStatus';
import { LOADING_MY_SUBORDINATES_TREE, FETCH_MY_SUBORDINATES_TREE_SUCCEEDED } from '../../constants/MySubordinatesTreeStatus';
import { LOADING_SINGLE_SUBORDINATE_TREE, FETCH_SINGLE_SUBORDINATE_TREE_SUCCEEDED } from '../../constants/SingleSubordinateTreeStatus';
import { LOADING_SINGLE_TEAM_TREE, FETCH_SINGLE_TEAM_TREE_SUCCEEDED } from '../../constants/SingleTeamTreeStatus';

const TreeTab = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  const initialTree = {
    name: 'Topics',
    children: [],
  };

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

  const isLoading = personalTreeStatus === LOADING_PERSONAL_TREE || myTeamTreeStatus === LOADING_MY_TEAM_TREE || mySubordinatesTreeStatus === LOADING_MY_SUBORDINATES_TREE || singleSubordinateTreeStatus === LOADING_SINGLE_SUBORDINATE_TREE || singleTeamTreeStatus === LOADING_SINGLE_TEAM_TREE;

  useEffect(() => {
    switch (treeName) {
      case PERSONAL:
        if (personalTreeStatus === FETCH_PERSONAL_TREE_SUCCEEDED)
          reformatDataToTree(personalTree);
        break;
      case MY_TEAM:
        if (myTeamTreeStatus === FETCH_MY_TEAM_TREE_SUCCEEDED)
          reformatDataToTree(myTeamTree);
        break;
      case MY_SUBORDINATES:
        if (mySubordinatesTreeStatus === FETCH_MY_SUBORDINATES_TREE_SUCCEEDED)
          reformatDataToTree(mySubordinatesTree);
        break;
      case SINGLE_SUBORDINATE:
        if (singleSubordinateTreeStatus === FETCH_SINGLE_SUBORDINATE_TREE_SUCCEEDED)
          reformatDataToTree(singleSubordinateTree);
        break;
      case SINGLE_TEAM:
        if (singleTeamTreeStatus === FETCH_SINGLE_TEAM_TREE_SUCCEEDED)
          reformatDataToTree(singleTeamTree);
        break;
      default:
    }
  }, [personalTreeStatus, myTeamTreeStatus, mySubordinatesTreeStatus, singleTeamTreeStatus, singleSubordinateTreeStatus]);

  const onShowTree = ({ value, additionalParametersId }) => {
    setTreeName(value);
    switch (value) {
      case PERSONAL:
        dispatch(getPersonalTree());
        break;
      case MY_TEAM:
        dispatch(getMyTeamTree());
        break;
      case MY_SUBORDINATES:
        dispatch(getMySubordinatesTree());
        break;
      case SINGLE_SUBORDINATE:
        dispatch(getSingleSubordinateTree(additionalParametersId));
        break;
      case SINGLE_TEAM:
        dispatch(getSingleTeamTree(additionalParametersId));
        break;
      default:
    }
  };

  return (
    <Container fluid>
      <SelectTreeForm onSelect={selectedTree => onShowTree(selectedTree)} />
      <Box align="center" padding="medium" margin={2}>
        <Heading
          appearance="H2"
        >
          {treeName}
          {' '}
          Tree
        </Heading>
        <Box marginLeft="tiny">
          <InfoIcon content="Double click on the node or click on the badge to see more information about the topic." />
        </Box>
      </Box>
      <Box align="center">
        {isLoading ? <Loader size="small" />
          : <TreeContainer data={tree} width={windowWidth - 200} height={TOPICS_TREE_HEIGHT} type={treeName} />}
      </Box>
      <FormField label="Learned - Planned - Not planned">
        <Box height="24px" width="220px">
          <Palette
            fill={[
              TREE_NODE_LEARNED_COLOR,
              TREE_NODE_PLANNED_COLOR,
              TREE_NODE_NOT_PLANNED_COLOR,
            ]}
          />
        </Box>
      </FormField>
      <FormField label="LEARNED | PLANNED">
        <Box height="24px" width="160px">
          <Palette
            fill={[
              TREE_NODE_BADGE_COLOR,
            ]}
          />
        </Box>
      </FormField>
    </Container>
  );
};

export default TreeTab;
