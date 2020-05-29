/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
import { LinearGradient } from '@vx/gradient';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { hierarchy } from 'd3-hierarchy';
import React, { useCallback, useState } from 'react';
import {
  Box, Container, Dropdown, FormField, ToggleSwitch,
} from 'wix-style-react';
import { TREE_CONTAINER_FILL } from '../../../constants/Styling';
import {
  LAYOUT_CARTESIAN, LAYOUT_POLAR, LINK_CURVE, LINK_DIAGONAL, LINK_LINE, LINK_STEP, ORIENTATION_HORIZONTAL, ORIENTATION_VERTICAL,
} from '../../../constants/TreeContainerTypes';
import ColorsContainer from '../ColorsContainer';
import LinksMove from './LinksMove';
import NodesMove from './NodesMove';

const TreeContainer = ({
  data, width, height, type,
}) => {
  const [orientation, setOrientation] = useState(ORIENTATION_HORIZONTAL);
  const [linkType, setLinkType] = useState(LINK_DIAGONAL);
  const [toggleSwitchChecked, setToggleSwitchChecked] = useState(false);

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const handleToggleSwitch = checked => {
    setToggleSwitchChecked(checked);
  };

  const stepPercent = 0.5;
  const layout = LAYOUT_CARTESIAN;

  const margin = {
    top: 30,
    left: 50,
    right: 100,
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

  const root = hierarchy(data);
  console.log('root', root);
  return (
    <Container>
      {console.log('NODE IN RENDER: ', data)}
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
          <FormField label="Animatable" labelPlacement="left">
            <ToggleSwitch
              size="large"
              checked={toggleSwitchChecked}
              onChange={e => handleToggleSwitch(e.target.checked)}
            />
          </FormField>
        </Box>
      </Box>
      <ColorsContainer />
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
                isAnimated={toggleSwitchChecked}
                onNodeClick={node => {
                  console.log('clicked on:', node);
                  // links
                  node.data.x0 = node.x;
                  node.data.y0 = node.y;
                  node.data.isExpanded = false;
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
