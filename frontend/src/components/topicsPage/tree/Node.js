/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  TREE_CHILDREN_NODE_FILL, TREE_NOT_CHILDREN_NODE_FILL, TREE_NODE_FILL, FONT_FAMILY,
} from '../../../constants/Styling';

const Node = ({ node, onClick }) => {
  const width = 100;
  const height = 20;

  return (
    <>
      {node.depth === 0 && (
        <circle
          r={12}
          fill="url('#lg')"
          onClick={onClick}
        />
      )}
      {node.depth !== 0 && (
        <rect
          height={height}
          width={width}
          y={-height / 2}
          x={-width / 2}
          fill={TREE_NODE_FILL}
          stroke={node.data.children ? TREE_CHILDREN_NODE_FILL : TREE_NOT_CHILDREN_NODE_FILL}
          strokeWidth={1}
          strokeDasharray={!node.data.children ? '2,2' : '0'}
          strokeOpacity={!node.data.children ? 0.6 : 1}
          rx={!node.data.children ? 10 : 0}
          onClick={onClick}
        />
      )}
      <text
        dy=".33em"
        fontSize={9}
        fontFamily={FONT_FAMILY}
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={
          node.depth === 0 ? (
            '#71248e'
          ) : node.children ? (
            'white'
          ) : (
            '#26deb0'
          )
        }
      >
        {node.data.name}
      </text>
    </>
  );
};

export default Node;
