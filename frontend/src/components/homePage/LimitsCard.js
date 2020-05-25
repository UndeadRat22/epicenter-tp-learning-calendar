import React from 'react';
import { Text, StatusIndicator } from 'wix-style-react';
import s from './LimitsCard.scss';

const LimitsCard = ({ assignedLimit, remainingLimit, isLoading }) => {
  let remainingDaysPerQuarterClassName;
  if (!isLoading) {
    if (remainingLimit.daysPerQuarter === 0)
      remainingDaysPerQuarterClassName = s.rightRedText;
    else if (remainingLimit.daysPerQuarter === 1)
      remainingDaysPerQuarterClassName = s.rightYellowText;
    else
      remainingDaysPerQuarterClassName = s.rightLimitText;
  }

  return (
    <div>
      <div style={{ marginBottom: 6, textAlign: 'left' }}>
        <Text size="medium" weight="normal">LIMITS:</Text>
        {isLoading ? <StatusIndicator className={s.rightText} status="loading" message="Loading limits" />
          : (
            <span className={s.rightText}>
              days per quarter:
              {' '}
              {assignedLimit.daysPerQuarter}
              {' '}
              | topics per day:
              {' '}
              {assignedLimit.topicsPerDay}
            </span>
          )}
      </div>
      <div style={{ marginBottom: 12, textAlign: 'left' }}>
        <Text size="medium" weight="normal">LEFT:</Text>
        {isLoading ? <StatusIndicator className={s.rightText} status="loading" message="Loading limits" />
          : (
            <>
              <span className={remainingDaysPerQuarterClassName}>
                {remainingLimit.daysPerQuarter}
              </span>
              <span className={s.rightText}>
                days per quarter:
              </span>
            </>
          )}
      </div>
    </div>
  );
};

export default LimitsCard;
