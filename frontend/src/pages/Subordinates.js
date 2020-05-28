import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Page,
} from 'wix-style-react';
import { getSubordinates, getMyTeam, getLimits } from '../state/actions';
import ResetSaveButtonsBox from '../components/ResetSaveButtonsBox';
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
        subtitle="Here you can make change which will impact all of your subordinates"
        actionsBar={<ResetSaveButtonsBox />}
      />
      <Page.Content>
        <div style={{ marginBottom: 30 }}>
          <SubordinatesAssignComponent />
        </div>
        {isTopLevelManager && <GlobalLimitsCard />}
      </Page.Content>
    </Page>
  );
};

export default Subordinates;
