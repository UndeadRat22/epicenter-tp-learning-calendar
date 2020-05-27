/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Group } from '@vx/group';
import {
  Badge, Container, Tooltip,
} from 'wix-style-react';

import Node from './Node';
import { getTopLeft } from './utils';

const Nodes = ({
  nodes, layout, orientation, onNodeClick,
}) => {
  return (
    <>
      { nodes.map((node, i) => (
        <Group {...getTopLeft(node, layout, orientation)} key={i}>
          <Tooltip content="i am tooltip">
            TOOLTOP
          </Tooltip>
          <Node
            node={node}
            layout={layout}
            orientation={orientation}
            onClick={() => onNodeClick(node)}
          />
        </Group>
      ))}
    </>
  );
};

export default Nodes;
