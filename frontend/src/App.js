import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import './App.global.scss';
import { TIMEOUT_MS } from './constants/FeatureToggles';
import Routing from './router/Routing';
import FeatureToggles from './utils/FeatureToggles';
import store from './state';
import { FEATURES_URL } from './constants/URL';
import LoadingIndicator from './components/LoadingIndicator';

const App = () => {
  const [featuresLoaded, setFeaturesLoaded] = useState(false);

  useEffect(() => {
    const loadFeatures = async () => {
      // if we don't fetch features before
      // TIMEOUT_MS expires, we render app without them
      await Promise.race([
        FeatureToggles.init(FEATURES_URL),
        new Promise(resolve => setTimeout(resolve, TIMEOUT_MS)),
      ]);

      setFeaturesLoaded(true);
    };

    loadFeatures();
  }, []);

  if (featuresLoaded) {
    return (
      <Provider store={store}>
        <Routing />
      </Provider>
    );
  }
  return (
    <LoadingIndicator text="Loading feature toggles..." />
  );
};

export default App;
