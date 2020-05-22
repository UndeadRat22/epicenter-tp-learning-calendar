import React, { useState, useEffect } from 'react';
import {
  Page,
  Breadcrumbs,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from '../components/homePage/Calendar';
import GoalsCard from '../components/homePage/GoalsCard';
import { getPersonalGoals } from '../state/actions/personalGoals';
import { FETCH_PERSONAL_GOALS_SUCCEEDED } from '../constants/PersonalGoalsStatus';

const Home = () => {
  const [isMonthlyView, setIsMonthlyView] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState(getBreadcrumbs(true));
  const { goals, status } = useSelector(state => state.personalGoals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalGoals());
  }, [dispatch]);

  const filteredGoals = goals.filter(goal => !goal.isCompleted);

  const onBreadcrumbClick = ({ id }) => {
    if (id === 0) {
      setIsMonthlyView(true);
      setBreadcrumbs(getBreadcrumbs(true));
    }
  };

  const onLearningDayClick = () => {
    setIsMonthlyView(false);
    setBreadcrumbs(getBreadcrumbs(false));
  };

  const onBackClick = () => {
    setIsMonthlyView(true);
    setBreadcrumbs(getBreadcrumbs(true));
  };

  return (
    <Page height="1000px">
      <Page.Header
        showBackButton={!isMonthlyView}
        onBackClicked={onBackClick}
        title="Home"
        breadcrumbs={(
          <Breadcrumbs
            items={breadcrumbs}
            activeId={isMonthlyView ? 1 : 2}
            size="medium"
            theme="onGrayBackground"
            onClick={onBreadcrumbClick}
          />
      )}
      />
      <Page.Content>
        <div>
          {isMonthlyView
          && (
          <div style={{ marginBottom: 20 }}>
            <GoalsCard goals={filteredGoals} isLoading={status !== FETCH_PERSONAL_GOALS_SUCCEEDED} />
          </div>
          )}
          <Calendar onLearningDayClick={onLearningDayClick} isMonthlyView={isMonthlyView} />
        </div>
      </Page.Content>

    </Page>
  );
};

const getBreadcrumbs = isMonthlyView => {
  const monthlyViewBreadcrumb = {
    id: 0,
    value: 'Month',
  };

  const learningDayViewBreadcrumb = {
    id: 1,
    value: 'Learning day',
  };

  return isMonthlyView ? [monthlyViewBreadcrumb] : [monthlyViewBreadcrumb, learningDayViewBreadcrumb];
};

export default Home;
