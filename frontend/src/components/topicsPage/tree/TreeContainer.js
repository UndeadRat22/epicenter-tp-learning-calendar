/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
import React, { useState, useCallback } from 'react';
import {
  Container, Dropdown, Box, FormField, ToggleSwitch,
} from 'wix-style-react';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinearGradient } from '@vx/gradient';
import { hierarchy } from 'd3-hierarchy';
import LinksMove from './LinksMove';
import NodesMove from './NodesMove';
import {
  LAYOUT_CARTESIAN,
  LAYOUT_POLAR,
  ORIENTATION_HORIZONTAL,
  ORIENTATION_VERTICAL,
  LINK_DIAGONAL,
  LINK_CURVE,
  LINK_STEP,
  LINK_LINE,
} from '../../../constants/TreeContainerTypes';
import { TREE_CONTAINER_FILL } from '../../../constants/Styling';

const TreeContainer = ({
  data, width, height, type,
}) => {
  const [orientation, setOrientation] = useState(ORIENTATION_HORIZONTAL);
  const [linkType, setLinkType] = useState(LINK_DIAGONAL);
  const [toggleSwitchChecked, setToggleSwitchChecked] = useState(true);

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);


  const handleToggleSwitch = checked => {
    setToggleSwitchChecked(checked);
  };

  const stepPercent = 0.5;
  const layout = LAYOUT_CARTESIAN;

  const margin = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  };

  if (width < 10)
    return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let origin;
  let sizeWidth;
  let sizeHeight;

  if (layout === LAYOUT_POLAR) {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === ORIENTATION_VERTICAL) {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  const root = hierarchy(data, d => (d.isExpanded ? d.children : null));

  return (
    <Container>
      <Box align="space-between" padding="small" marginBottom={0.5} verticalAlign="bottom">
        <Box align="left">
          <FormField label="Orientation">
            <Dropdown
              size="small"
              placeholder={orientation}
              value={orientation}
              disabled={layout === LAYOUT_POLAR}
              options={[
                { id: 0, value: ORIENTATION_VERTICAL },
                { id: 1, value: ORIENTATION_HORIZONTAL },
              ]}
              onSelect={event => setOrientation(event.value)}
            />
          </FormField>

          <FormField label="Link">
            <Dropdown
              size="small"
              placeholder={linkType}
              value={linkType}
              options={[
                { id: 0, value: LINK_DIAGONAL },
                { id: 1, value: LINK_STEP },
                { id: 2, value: LINK_CURVE },
                { id: 3, value: LINK_LINE },
              ]}
              onSelect={event => setLinkType(event.value)}
            />
          </FormField>
        </Box>
        <Box align="right">
          <ToggleSwitch
            size="large"
            checked={toggleSwitchChecked}
            onChange={e => handleToggleSwitch(e.target.checked)}
          />
        </Box>
      </Box>
      <svg width={width} height={height}>
        <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
        <rect width={width} height={height} rx={14} fill={TREE_CONTAINER_FILL} />
        <Tree
          top={margin.top}
          left={margin.left}
          root={root}
          size={[
            sizeWidth,
            sizeHeight,
          ]}
          separation={(a, b) => (a.parent == b.parent ? 1 : 0.5) / a.depth}
        >
          {({ data }) => (
            <Group
              top={origin.y}
              left={origin.x}
            >
              <LinksMove
                links={data.links()}
                linkType={linkType}
                layout={layout}
                orientation={orientation}
                stepPercent={stepPercent}
              />

              <NodesMove
                nodes={data.descendants()}
                type={type}
                layout={layout}
                orientation={orientation}
                expand={toggleSwitchChecked}
                onNodeClick={node => {
                  if (!node.data.isExpanded) {
                    node.data.x0 = node.x;
                    node.data.y0 = node.y;
                  }
                  node.data.isExpanded = !node.data.isExpanded;
                  forceUpdate();
                }}
              />
            </Group>
          )}
        </Tree>
      </svg>
    </Container>
  );
};

export default TreeContainer;
