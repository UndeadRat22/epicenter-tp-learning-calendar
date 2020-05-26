/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { Group } from '@vx/group';

import Node from './Node';
import { getTopLeft } from './utils';

function Nodes({
  nodes, layout, orientation, onNodeClick,
}) {
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
}

export default Nodes;
