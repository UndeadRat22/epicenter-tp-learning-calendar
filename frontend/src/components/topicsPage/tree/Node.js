/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
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
  TREE_NODE_BADGE_COLOR,
  TREE_NODE_TEXT_COLOR_LIGHT,
} from '../../../constants/Styling';
import {
  PERSONAL, MY_TEAM, MY_SUBORDINATES, SINGLE_SUBORDINATE, SINGLE_TEAM,
} from '../../../constants/TreeTypes';
import { LEARNED, PLANNED, NOTPLANNED } from '../../../constants/ProgressStatus';
import TopicModal from '../../modals/TopicModal';
import './Node.global.scss';

const Node = ({
  node, onClick, isExpanded, type,
}) => {
  const width = TREE_NODE_WIDTH;
  const height = TREE_NODE_HEIGHT;

  const { status } = node.data;
  const { id } = node.data;
  const topic = { id, subject: node.data.name };

  const [isOpenedTopicModal, setIsOpenedTopicModal] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);
  const [plannedCount, setPlannedCount] = useState(0);

  useEffect(() => {
    if (node.data.learnedEmployees !== undefined)
      getBadgeData();
    if (isExpanded)
      onClick();
  }, []);

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

  const applyNodeSubject = () => {
    if (node.data.name.length > 17) {
      let newName = node.data.name.substring(0, 17);
      newName = newName.concat('...');
      return newName;
    }
    return node.data.name;
  };

  const getBadgeData = () => {
    if (type === MY_TEAM || type === MY_SUBORDINATES || type === SINGLE_TEAM) {
      setLearnedCount(node.data.learnedEmployees.length);
      setPlannedCount(node.data.plannedEmployees.length);
    }
  };

  const shouldBadgeDisplay = () => {
    if (type === PERSONAL || type === SINGLE_SUBORDINATE)
      return false;
    return true;
  };

  const handleNodeClick = () => {
    if (!isExpanded)
      onClick();
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
        onClick={() => handleNodeClick()}
        onDoubleClick={() => setIsOpenedTopicModal(true)}
      />
      )}
      {node.depth !== 0 && shouldBadgeDisplay() && (
      <>
        <rect
          x="45"
          y="-23"
          rx="20"
          ry="10"
          width="27"
          height="27"
          className="cursor"
          style={{
            fill: TREE_NODE_BADGE_COLOR, stroke: 'black', strokeWidth: 1,
          }}
          onClick={() => setIsOpenedTopicModal(true)}
        />
        <text
          x="47"
          y="-7"
          fill={TREE_NODE_TEXT_COLOR}
          fontSize={TREE_NODE_FONT_SIZE}
          fontFamily={FONT_FAMILY}
          onClick={() => setIsOpenedTopicModal(true)}
          className="cursor"
        >
          {learnedCount}
          {' '}
          |
          {' '}
          {plannedCount}
        </text>
      </>
      )}
      <text
        dy=".33em"
        fontSize={TREE_NODE_FONT_SIZE}
        fontFamily={FONT_FAMILY}
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={status === NOTPLANNED ? TREE_NODE_TEXT_COLOR_LIGHT : TREE_NODE_TEXT_COLOR}
      >
        {applyNodeSubject()}
      </text>
      {isOpenedTopicModal
      && (
      <TopicModal
        isModalOpened={isOpenedTopicModal}
        onCloseModal={() => setIsOpenedTopicModal(false)}
        topic={topic}
      />
      )}
    </>
  );
};

export default Node;
