import React, { useEffect, useState } from 'react';
import { Heading, Loader, Text } from 'wix-style-react';
import './App.global.scss';
import ExampleFeatureToggles from './components/ExampleFeatureToggles';
import { TIMEOUT_MS } from './constants/FeatureToggles';
import { LOCAL_FEATURES_URL } from './constants/URL';
import FeatureToggles from './utils/FeatureToggles';

const App = () => {
  const [featuresLoaded, setFeaturesLoaded] = useState(false);

  useEffect(() => {
    const loadFeatures = async () => {
      // if we don't fetch features before
      // TIMEOUT_MS expires, we render app without them
      await Promise.race([
        FeatureToggles.init(LOCAL_FEATURES_URL),
        new Promise(resolve => setTimeout(resolve, TIMEOUT_MS)),
      ]);

      setFeaturesLoaded(true);
    };

    loadFeatures();
  }, []);

  if (featuresLoaded) {
    return (
      <div>
        <Heading appearance="H1">Epicenter</Heading>
        <Text size="small" weight="normal">
          The Learning Center
        </Text>
        <ExampleFeatureToggles />
      </div>
    );
  } else {
    return (
      <div className="center">
        <Loader size="large" />
      </div>
    );
  }
};

export default App;
