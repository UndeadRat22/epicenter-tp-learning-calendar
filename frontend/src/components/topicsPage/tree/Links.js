/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from './Link';
import { TREE_STROKE_COLOR } from '../../../constants/Styling';

const Links = ({
  links, linkType, layout, orientation, stepPercent,
}) => {
  return (
    <>
      {links.map((link, i) => {
        return (
          <Link
            data={link}
            linkType={linkType}
            layout={layout}
            orientation={orientation}
            stepPercent={stepPercent}
            stroke={TREE_STROKE_COLOR}
            strokeWidth="1"
            fill="none"
            key={i}
          />
        );
      })}
    </>
  );
};

export default Links;
