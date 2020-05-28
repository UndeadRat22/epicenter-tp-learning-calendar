import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Page,
} from 'wix-style-react';
import { getSubordinates, getMyTeam, getLimits } from '../state/actions';
import SubordinatesAssignComponent from '../components/subordinates/SubordinatesAssignComponent';
import GlobalLimitsCard from '../components/subordinates/GlobalLimitsCard';

const Subordinates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubordinates());
    dispatch(getMyTeam());
    dispatch(getLimits());
  }, [dispatch]);

  const { isTopLevelManager } = useSelector(state => state.auth.user);

  return (
    <Page>
      <Page.Header
        title="Subordinates"
        subtitle="Here you can manage teams of your subordinates"
      />
      <Page.Content>
        <div style={{ marginBottom: 30 }}>
          {isTopLevelManager && <GlobalLimitsCard />}
        </div>
        <SubordinatesAssignComponent />
      </Page.Content>
    </Page>
  );
};

export default Subordinates;
