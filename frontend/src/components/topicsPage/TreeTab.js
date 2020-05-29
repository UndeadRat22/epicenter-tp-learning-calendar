/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Container, Heading, InfoIcon, Loader,
} from 'wix-style-react';
import { ROOT_NODE } from '../../constants/General';
import { FETCH_MY_SUBORDINATES_TREE_SUCCEEDED, LOADING_MY_SUBORDINATES_TREE } from '../../constants/MySubordinatesTreeStatus';
import { FETCH_MY_TEAM_TREE_SUCCEEDED, LOADING_MY_TEAM_TREE } from '../../constants/MyTeamTreeStatus';
import { FETCH_PERSONAL_TREE_SUCCEEDED, LOADING_PERSONAL_TREE } from '../../constants/PersonalTreeStatus';
import { FETCH_SINGLE_SUBORDINATE_TREE_SUCCEEDED, LOADING_SINGLE_SUBORDINATE_TREE } from '../../constants/SingleSubordinateTreeStatus';
import { FETCH_SINGLE_TEAM_TREE_SUCCEEDED, LOADING_SINGLE_TEAM_TREE } from '../../constants/SingleTeamTreeStatus';
import { TOPICS_TREE_HEIGHT } from '../../constants/Styling';
import {
  MY_SUBORDINATES, MY_TEAM, PERSONAL, SINGLE_SUBORDINATE, SINGLE_TEAM,
} from '../../constants/TreeTypes';
import {
  getMySubordinatesTree, getMyTeamTree, getPersonalTree, getSingleSubordinateTree, getSingleTeamTree,
} from '../../state/actions';
import useWindowSize from '../../useWindowSize';
import SelectTreeForm from './SelectTreeForm';
import TreeContainer from './tree/TreeContainer';

const TreeTab = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  const treeWidth = windowWidth < 1365 ? windowWidth - 96 : (windowWidth - (windowWidth - (1365 - 96)));

  const initialTree = {
    name: ROOT_NODE,
    children: [],
  };

  const [tree, setTree] = useState(initialTree);
  const [treeName, setTreeName] = useState(PERSONAL);
  const [isInitial, setIsInitial] = useState(true);

  const dispatch = useDispatch();

  const { tree: personalTree, status: personalTreeStatus } = useSelector(state => state.personalTree);
  const { tree: myTeamTree, status: myTeamTreeStatus } = useSelector(state => state.myTeamTree);
  const { tree: mySubordinatesTree, status: mySubordinatesTreeStatus } = useSelector(state => state.mySubordinatesTree);
  const { tree: singleSubordinateTree, status: singleSubordinateTreeStatus } = useSelector(state => state.singleSubordinateTree);
  const { tree: singleTeamTree, status: singleTeamTreeStatus } = useSelector(state => state.singleTeamTree);

  const reformatDataToTree = data => {
    const newTree = {
      name: ROOT_NODE,
      children: data,
    };
    setTree(newTree);
  };

  const isLoading = personalTreeStatus === LOADING_PERSONAL_TREE || myTeamTreeStatus === LOADING_MY_TEAM_TREE || mySubordinatesTreeStatus === LOADING_MY_SUBORDINATES_TREE || singleSubordinateTreeStatus === LOADING_SINGLE_SUBORDINATE_TREE || singleTeamTreeStatus === LOADING_SINGLE_TEAM_TREE;

  useEffect(() => {
    if (isInitial) {
      dispatch(getPersonalTree());
      setIsInitial(false);
    }
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
          : <TreeContainer data={tree} width={treeWidth} height={TOPICS_TREE_HEIGHT} type={treeName} />}
      </Box>
    </Container>
  );
};

export default TreeTab;
