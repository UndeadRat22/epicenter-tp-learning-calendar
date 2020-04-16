import React from 'react';
import { DEBUG_MODE } from '../constants/FeatureToggles';
import FeatureToggles from '../utils/FeatureToggles';

const ExampleFeatureToggles = () => {
  return (
    <div>DEBUG_MODE = {FeatureToggles.isOn(DEBUG_MODE) ? 'ON' : 'OFF'}</div>
  );
};

export default ExampleFeatureToggles;
