import React from 'react';
import {
  Page,
} from 'wix-style-react';
import GlobalLimitsCard from '../components/subordinates/GlobalLimitsCard';

const Subordinates = () => {
  return (
    <Page height="1000px">
      <Page.Header title="Subordinates" subtitle="Here you can make change which will impact all of your subordinates" />
      <Page.Content>
        <GlobalLimitsCard />
      </Page.Content>
    </Page>
  );
};

export default Subordinates;
