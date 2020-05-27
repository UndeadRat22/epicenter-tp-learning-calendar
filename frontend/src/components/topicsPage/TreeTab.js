import React from 'react';
import {
  Container, Row, Col,
} from 'wix-style-react';
import Tree from './tree/Tree';
import data from './tree/data';
import SelectTreeForm from './SelectTreeForm';

const TreeTab = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          TreeTab
          <Tree data={data} width={600} height={500} />
          <SelectTreeForm />
        </Col>
      </Row>
    </Container>
  );
};

export default TreeTab;
