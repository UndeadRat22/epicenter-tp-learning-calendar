import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Page,
} from 'wix-style-react';
import { getLimits } from '../state/actions/limits';
import GlobalLimitsCard from '../components/subordinates/GlobalLimitsCard';

const Subordinates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLimits());
  }, [dispatch]);

  const { isTopLevelManager } = useSelector(state => state.auth.user);

  return (
    <Page>
      <Page.Header title="Subordinates" subtitle="Here you can make change which will impact all of your subordinates" />
      <Page.Content>
        {isTopLevelManager && <GlobalLimitsCard />}
      </Page.Content>
    </Page>
  );
};

export default Subordinates;
