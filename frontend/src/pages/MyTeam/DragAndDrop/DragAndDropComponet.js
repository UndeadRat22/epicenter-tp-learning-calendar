import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import {
  Container, Row, Col, Box, Card, Search, Text, IconButton,
} from 'wix-style-react';
import { Add } from 'wix-ui-icons-common';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTopics, getMyTeam, getPersonalGoals } from '../../../state/actions';
import {
  LOADING_ALL_TOPICS, FETCH_ALL_TOPICS_SUCCEEDED, FETCH_ALL_TOPICS_FAILED,
} from '../../../constants/AllTopicsStatus';
import {
  FETCH_MY_TEAM_SUCCEEDED, FETCH_MY_TEAM_FAILED,
} from '../../../constants/MyTeamStatus';
import {
  FETCH_PERSONAL_GOALS_SUCCEEDED, FETCH_PERSONAL_GOALS_FAILED,
} from '../../../constants/PersonalGoalsStatus';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Employee from './Employee';
import Topic from './Topic';
import TeamPlaceholder from './TeamPlaceholder';

const DragAndDropComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTopics());
    dispatch(getMyTeam());
    dispatch(getPersonalGoals());
  }, [dispatch]);

  const [topicsFilter, setTopicsFilter] = useState('');

  const allTopics = useSelector(state => state.allTopics);
  const loadingTopics = allTopics.status === LOADING_ALL_TOPICS;
  const fetchTopicsSucceeded = allTopics.status === FETCH_ALL_TOPICS_SUCCEEDED;
  const fetchTopicsFailed = allTopics.status === FETCH_ALL_TOPICS_FAILED;
  const filteredTopics = allTopics.topics.filter(topic => topic.subject.toLowerCase().includes(topicsFilter));

  const personalGoals = useSelector(state => state.personalGoals);
  const fetchPersonalGoalsSucceeded = personalGoals.status === FETCH_PERSONAL_GOALS_SUCCEEDED;
  const fetchPersonalGoalsFailed = personalGoals.status === FETCH_PERSONAL_GOALS_FAILED;

  let personalGoalTopics = [];
  if (fetchPersonalGoalsSucceeded)
    personalGoalTopics = personalGoals.goals.filter(goal => !goal.isCompleted).map(goal => { return { topicId: goal.topicId, topic: 'TODO: add to response' }; });

  const self = useSelector(state => state.auth.user);
  const selfEmployee = { id: 'self-employee', name: `${self.firstName} ${self.lastName}`, goalTopics: personalGoalTopics };

  const myTeam = useSelector(state => state.myTeam);
  const fetchMyTeamSucceeded = myTeam.status === FETCH_MY_TEAM_SUCCEEDED;
  const fetchMyTeamFailed = myTeam.status === FETCH_MY_TEAM_FAILED;
  const { employees } = myTeam.myTeam;

  const allEmployees = [selfEmployee];
  if (fetchMyTeamSucceeded)
    allEmployees.push(...employees);

  const fetchEmployeesSucceeded = fetchPersonalGoalsSucceeded && fetchMyTeamSucceeded;
  const fetchEmployeesFailed = fetchPersonalGoalsFailed || fetchMyTeamFailed;
  const loadingEmployees = !fetchEmployeesSucceeded && !fetchEmployeesFailed;

  const cardContentHeight = 600;

  return (
    <DndProvider backend={Backend}>
      <Container>
        <Row stretchViewsVertically>
          <Col span={5}>
            <Card stretchVertically>
              <Card.Header
                title="Topics"
                suffix={(
                  <Search
                    debounceMs={250}
                    clearButton={false}
                    onChange={e => setTopicsFilter(e.target.value.toLowerCase())}
                  />
                )}
              />
              <Card.Divider />
              <Card.Content>
                <Box height={cardContentHeight} direction="vertical" overflowY="auto">
                  {loadingTopics && <LoadingIndicator text="Loading topics..." />}
                  {fetchTopicsSucceeded && filteredTopics.map(topic => <Topic key={topic.id} topic={topic} />)}
                  {fetchTopicsFailed && <Text>Failed to load topics</Text>}
                  <IconButton as="button" size="medium">
                    <Add />
                  </IconButton>
                </Box>
              </Card.Content>
            </Card>
          </Col>
          <Col span={7}>
            <Card stretchVertically>
              <Card.Header
                title="Employees"
                suffix={<TeamPlaceholder />}
              />
              <Card.Divider />
              <Card.Content>
                <Box height={cardContentHeight} direction="vertical" overflowY="auto">
                  {loadingEmployees && <LoadingIndicator text="Loading employees..." />}
                  {fetchEmployeesSucceeded && allEmployees.map(employee => <Employee key={employee.id} employee={employee} />)}
                  {fetchEmployeesFailed && <Text>Failed to load employees</Text>}
                </Box>
              </Card.Content>
            </Card>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default DragAndDropComponent;
