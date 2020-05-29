import React, { useState, useEffect } from 'react';
import {
  Page,
  Breadcrumbs,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from '../components/homePage/Calendar';
import GoalsCard from '../components/homePage/GoalsCard';
import { getPersonalGoals } from '../state/actions/personalGoals';
import { FETCH_PERSONAL_GOALS_SUCCEEDED, LOADING_PERSONAL_GOALS } from '../constants/PersonalGoalsStatus';
import { getLimits } from '../state/actions/limits';
import LimitsCard from '../components/homePage/LimitsCard';
import {
  FETCH_LIMITS_SUCCEEDED, LOADING_FETCH_LIMITS, FETCH_LIMITS_FAILED, INACTIVE_FETCH_LIMITS,
} from '../constants/LimitsStatus';
import { getLearningDays } from '../state/actions/learningDays';
import { getAllTopics, getLearnedTopics } from '../state/actions';
import { LOADING_FETCH_LEARNED_TOPICS } from '../constants/TopicStatus';

const Home = () => {
  const [isMonthlyView, setIsMonthlyView] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState(getBreadcrumbs(true));

  const { goals, status: goalsStatus } = useSelector(state => state.personalGoals);
  const { assignedLimit, remainingLimit, status: limitsStatus } = useSelector(state => state.limits);
  const { selfLearningDays, teamLearningDays, status: learningDaysStatus } = useSelector(state => state.learningDays);
  const { learnedTopics, learnedTopicsStatus } = useSelector(state => state.topic);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalGoals());
    dispatch(getLimits());
    dispatch(getLearningDays());
    dispatch(getAllTopics());
    dispatch(getLearnedTopics());
  }, [dispatch]);

  const notLearnedGoals = goals.filter(goal => !goal.isCompleted);

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
    <Page>
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
        {isMonthlyView
          && <LimitsCard assignedLimit={assignedLimit} remainingLimit={remainingLimit} isLoading={limitsStatus === LOADING_FETCH_LIMITS || limitsStatus === INACTIVE_FETCH_LIMITS} failed={limitsStatus === FETCH_LIMITS_FAILED} />}
        {isMonthlyView
          && (
          <div style={{ marginBottom: 20 }}>
            <GoalsCard notLearnedGoals={notLearnedGoals} learnedTopics={learnedTopics} isLoadingTopics={learnedTopicsStatus === LOADING_FETCH_LEARNED_TOPICS} isLoadingGoals={goalsStatus === LOADING_PERSONAL_GOALS} />
          </div>
          )}
        <Calendar onLearningDayClick={onLearningDayClick} isMonthlyView={isMonthlyView} selfLearningDays={selfLearningDays} teamLearningDays={teamLearningDays} />
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
