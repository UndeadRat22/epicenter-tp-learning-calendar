import React from 'react';
import { SectionHelper } from 'wix-style-react';

const Alert = ({
  appearance, header, text, onClose,
}) => {
  return (
    <SectionHelper
      appearance={appearance}
      onClose={() => onClose()}
      title={header}
    >
      {text}
    </SectionHelper>
  );
};
export default Alert;
