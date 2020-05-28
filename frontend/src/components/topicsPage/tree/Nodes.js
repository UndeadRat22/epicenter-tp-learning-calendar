/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Group } from '@vx/group';

import Node from './Node';
import { getTopLeft } from './utils';

const Nodes = ({
  nodes, layout, orientation, onNodeClick,
}) => {
  return (
    <>
      { nodes.map((node, i) => (
        <Group {...getTopLeft(node, layout, orientation)} key={i}>
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
