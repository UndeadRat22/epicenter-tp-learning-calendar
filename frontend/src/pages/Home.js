import React, { useState } from 'react';
import {
  Page,
  Breadcrumbs,
} from 'wix-style-react';
import Calendar from '../components/homePage/Calendar';

const Home = () => {
  const [isMonthlyView, setIsMonthlyView] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState(getBreadcrumbs(true));

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
      <Page.FixedContent>
        <Calendar onLearningDayClick={onLearningDayClick} isMonthlyView={isMonthlyView} />
      </Page.FixedContent>
    </Page>
  );
};

const getBreadcrumbs = isMonthlyView => {
  const monthlyViewBreadcrumb = {
    id: 0,
    value: 'Monthly',
  };

  const learningDayViewBreadcrumb = {
    id: 1,
    value: 'Learning day',
  };

  return isMonthlyView ? [monthlyViewBreadcrumb] : [monthlyViewBreadcrumb, learningDayViewBreadcrumb];
};

export default Home;
