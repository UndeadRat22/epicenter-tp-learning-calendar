import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Row, Col, Box, Card, NumberInput, Text, Loader,
} from 'wix-style-react';
import ResetSaveButtonsBox from '../ResetSaveButtonsBox';
import {
  LOADING_FETCH_GLOBAL_LIMITS, FETCH_GLOBAL_LIMITS_SUCCEEDED, FETCH_GLOBAL_LIMITS_FAILED,
  SAVE_GLOBAL_LIMITS_SUCCEEDED, SAVE_GLOBAL_LIMITS_FAILED,
} from '../../constants/GlobalLimitsStatus';
import { saveGlobalLimits } from '../../state/actions/globalLimits';

const GlobalLimitsCard = ({ isReadOnly }) => {
  const dispatch = useDispatch();

  const { fetchStatus, saveStatus, limit } = useSelector(state => state.globalLimits);

  const loadingFetchLimits = fetchStatus === LOADING_FETCH_GLOBAL_LIMITS;
  const fetchLimitsSucceeded = fetchStatus === FETCH_GLOBAL_LIMITS_SUCCEEDED;
  const fetchLimitsFailed = fetchStatus === FETCH_GLOBAL_LIMITS_FAILED;

  const saveLimitsSucceeded = saveStatus === SAVE_GLOBAL_LIMITS_SUCCEEDED;
  const saveLimitsFailed = saveStatus === SAVE_GLOBAL_LIMITS_FAILED;

  let daysPerQuarter;
  if (fetchLimitsSucceeded)
    daysPerQuarter = limit.daysPerQuarter;

  useEffect(() => {
    if (daysPerQuarter)
      setNewDaysPerQuarter(daysPerQuarter);
  }, [daysPerQuarter]);

  const isInputValid = () => {
    const isEmpty = newDaysPerQuarter === null;
    const isInteger = Number.isInteger(newDaysPerQuarter);
    const isNegative = newDaysPerQuarter < 0;
    return !isEmpty && isInteger && !isNegative;
  };

  const [newDaysPerQuarter, setNewDaysPerQuarter] = useState(daysPerQuarter);

  const changesMade = daysPerQuarter !== newDaysPerQuarter && isInputValid() && !loadingFetchLimits;

  const onReset = () => {
    setNewDaysPerQuarter(daysPerQuarter);
  };

  const onSave = () => {
    dispatch(saveGlobalLimits({ daysPerQuarter: newDaysPerQuarter }));
  };

  return (
    <Card>
      <Card.Header
        title="Global limits"
        subtitle="Only available to CEO"
        suffix={!isReadOnly && (
          <ResetSaveButtonsBox
            anyChangesMade={changesMade}
            onReset={onReset}
            onSave={onSave}
            savingFailed={saveLimitsFailed}
            savingSucceeded={saveLimitsSucceeded}
          />
        )}
      />
      <Card.Divider />
      <Card.Content>
        <Container>
          <Row>
            <Col span={6}>
              <Text>Learning Days per Quarter</Text>
            </Col>
            <Col span={6}>
              <Box align="right">
                {loadingFetchLimits && <Loader size="small" />}
                {fetchLimitsSucceeded && (
                  <NumberInput
                    disabled={isReadOnly}
                    min={0}
                    value={newDaysPerQuarter}
                    onChange={value => setNewDaysPerQuarter(value)}
                  />
                )}
                {fetchLimitsFailed && <Text>Failed to load global limits</Text>}
              </Box>
            </Col>
          </Row>
        </Container>
      </Card.Content>
    </Card>
  );
};

export default GlobalLimitsCard;
