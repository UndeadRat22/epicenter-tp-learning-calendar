import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Loader } from 'wix-style-react';
import './styles/App.global.scss';
import ExampleFeatureToggles from './components/ExampleFeatureToggles';
import { TIMEOUT_MS } from './constants/FeatureToggles';
import { LOCAL_FEATURES_URL } from './constants/URL';
import FeatureToggles from './utils/FeatureToggles';
import Routing from './components/Routing';
import store from './state/store';

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
      <Provider store={store}>
        <Routing />
        <ExampleFeatureToggles />
      </Provider>
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
