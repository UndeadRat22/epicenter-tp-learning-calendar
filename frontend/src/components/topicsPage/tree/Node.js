/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TREE_NODE_OUTLINE_COLOR,
  FONT_FAMILY,
  TREE_NODE_LEARNED_COLOR,
  TREE_NODE_PLANNED_COLOR,
  TREE_NODE_NOT_PLANNED_COLOR,
  TREE_ROOT_CIRCLE_SIZE,
  TREE_NODE_TEXT_COLOR,
  TREE_NODE_FONT_SIZE,
  TREE_NODE_HEIGHT,
  TREE_NODE_WIDTH,
} from '../../../constants/Styling';
import { LEARNED, PLANNED } from '../../../constants/ProgressStatus';
import { getTopic } from '../../../state/actions';

const Node = ({ node, onClick }) => {
  const width = TREE_NODE_WIDTH;
  const height = TREE_NODE_HEIGHT;
  const { status } = node.data;
  const { id } = node.data;

  const dispatch = useDispatch();
  const { topic, status: topicStatus } = useSelector(state => state.topic);

  const getNodeColor = () => {
    let color;
    if (status === LEARNED)
      color = TREE_NODE_LEARNED_COLOR;
    else if (status === PLANNED)
      color = TREE_NODE_PLANNED_COLOR;
    else
      color = TREE_NODE_NOT_PLANNED_COLOR;
    return color;
  };

  // TODO:
  const displayAdditionalInfo = () => {
    // dispatch(getTopic(id));
  };

  return (
    <>
      {node.depth === 0 && (
        <circle
          r={TREE_ROOT_CIRCLE_SIZE}
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
          fill={getNodeColor()}
          stroke={TREE_NODE_OUTLINE_COLOR}
          strokeWidth={1}
          strokeDasharray={!node.data.children ? '2,2' : '0'}
          strokeOpacity={!node.data.children ? 0.6 : 1}
          rx={!node.data.children ? 10 : 0}
          onClick={onClick}
          onDoubleClick={() => displayAdditionalInfo()}
        />
      )}
      <text
        dy=".33em"
        fontSize={TREE_NODE_FONT_SIZE}
        fontFamily={FONT_FAMILY}
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={TREE_NODE_TEXT_COLOR}
      >
        {node.data.name}
      </text>
    </>
  );
};

export default Node;
