import React, { useState } from 'react';
import {
  Page,
  Breadcrumbs,
} from 'wix-style-react';
import Archive from 'wix-ui-icons-common/Archive';
import Calendar from '../components/homePage/Calendar';
import GoalsCard from '../components/homePage/GoalsCard';

const mockGoals = {
  goals: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      completionDate: '2020-05-22T19:56:07.432Z',
      topic: {
        id: '....',
        subject: 'C#',
      },
      topicId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      isCompleted: false,
    },
  ],
};

const Home = () => {
  const [isMonthlyView, setIsMonthlyView] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState(getBreadcrumbs(true));

  const filteredGoals = mockGoals.goals.filter(goal => !goal.isCompleted);

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
            <GoalsCard goals={filteredGoals} />
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
