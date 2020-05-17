import React, { useEffect } from 'react';
import {
  Container, Row, Col, Card,
} from 'wix-style-react';
import { useDispatch, useSelector } from 'react-redux';
import Tree from 'react-tree-graph';
import { getTopicsTree } from '../../state/actions/topicsTree';
import { LOADING_TOPICS_TREE } from '../../constants/TopicsTreeStatus';
import { TOPICS_TREE_HEIGHT, TOPICS_TREE_WIDTH } from '../../constants/Styling';
import LoadingIndicator from '../LoadingIndicator';
import 'react-tree-graph/dist/style.css';
import example from './topicsexample.json';


const TopicsTree = ({ onNodeClick }) => {
  const topicsTreeStatus = useSelector(state => state.topicsTree.status);
  const topics = useSelector(state => state.topicsTree.topicsTree);

  const showLoadingIndicator = topicsTreeStatus === LOADING_TOPICS_TREE;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopicsTree());
  }, []);

  /* TODO: tree design
    TODO: instead of data example use topics (already implemented)
    const children = example.topicTrees;
    const data = {
      name: 'Root',
      children,
    };
    investigate d3-hierarchy for data:
    it might be necessary to implement an algorithm to find id of node.
    When d3-hierarchy is rendered you cannot get id, only name (check it).
    For now there is some issues about rendering tree -> use d3-hierarchy to fix it.
  */
  const data = example;

  const handleClickNode = (event, node) => {
    onNodeClick(node);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header title="All topics" />
            {showLoadingIndicator && <LoadingIndicator />}
            <Card.Divider />
            <Card.Content>
              <Tree
                animated
                data={data}
                nodeRadius={4}
                height={TOPICS_TREE_HEIGHT}
                width={TOPICS_TREE_WIDTH}
                gProps={{
                  onClick: handleClickNode,
                }}
              />
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TopicsTree;
