import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import {
  Container, Row, Col, Box, Card, Search, Text, IconButton,
} from 'wix-style-react';
import { Add } from 'wix-ui-icons-common';
import { useSelector } from 'react-redux';
import {
  LOADING_ALL_TOPICS, FETCH_ALL_TOPICS_SUCCEEDED, FETCH_ALL_TOPICS_FAILED,
} from '../../constants/AllTopicsStatus';
import {
  FETCH_MY_TEAM_SUCCEEDED, FETCH_MY_TEAM_FAILED,
} from '../../constants/MyTeamStatus';
import {
  FETCH_PERSONAL_GOALS_SUCCEEDED, FETCH_PERSONAL_GOALS_FAILED,
} from '../../constants/PersonalGoalsStatus';
import { FETCH_LIMITS_SUCCEEDED, FETCH_LIMITS_FAILED } from '../../constants/LimitsStatus';
import { DND_COLUMN_HEIGHT } from '../../constants/Styling';
import LoadingIndicator from '../LoadingIndicator';
import Employee from './Employee';
import Topic from './Topic';
import s from './styles.scss';
import CreateTopicModal from '../modals/CreateTopicModal';

const GoalsAssignComponent = () => {
  const [topicsFilter, setTopicsFilter] = useState('');
  const [isOpenedCreateTopicModal, setIsOpenedCreateTopicModal] = useState(false);

  const { topics, status: topicsStatus } = useSelector(state => state.allTopics);
  const loadingTopics = topicsStatus === LOADING_ALL_TOPICS;
  const fetchTopicsSucceeded = topicsStatus === FETCH_ALL_TOPICS_SUCCEEDED;
  const fetchTopicsFailed = topicsStatus === FETCH_ALL_TOPICS_FAILED;
  const filteredTopics = topics.filter(topic => topic.subject.toLowerCase().indexOf(topicsFilter.toLocaleLowerCase()) !== -1);

  const { goals: personalGoals, status: personalGoalsStatus } = useSelector(state => state.personalGoals);
  const fetchPersonalGoalsSucceeded = personalGoalsStatus === FETCH_PERSONAL_GOALS_SUCCEEDED;
  const fetchPersonalGoalsFailed = personalGoalsStatus === FETCH_PERSONAL_GOALS_FAILED;

  const personalGoalTopics = [];
  if (fetchPersonalGoalsSucceeded) {
    personalGoalTopics.push(...personalGoals.filter(goal => !goal.isCompleted).map(goal => {
      return { topicId: goal.topic.id, topic: goal.topic.subject };
    }));
  }

  const { status: limitsStatus, assignedLimit, remainingLimit } = useSelector(state => state.limits);
  const fetchLimitsSucceeded = limitsStatus === FETCH_LIMITS_SUCCEEDED;
  const fetchLimitsFailed = limitsStatus === FETCH_LIMITS_FAILED;

  let myLimit;
  if (fetchLimitsSucceeded) {
    const assignedDaysPerQuarter = assignedLimit.daysPerQuarter;
    const remainingDaysPerQuarter = remainingLimit.daysPerQuarter;
    const createdDaysThisQuarter = assignedDaysPerQuarter - remainingDaysPerQuarter;
    myLimit = { learningDaysPerQuarter: assignedDaysPerQuarter, createdLearningDaysThisQuarter: createdDaysThisQuarter };
  }

  const { newGoals, newPersonalGoals } = useSelector(state => state.assignGoals);

  const { user } = useSelector(state => state.auth);
  const selfEmployee = {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    goalTopics: [...personalGoalTopics, ...newPersonalGoals.map(newGoal => {
      return { topicId: newGoal.topic.topicId, topic: newGoal.topic.topic, isRemovable: true };
    })],
    isSelf: true,
    limit: myLimit,
  };

  const { myTeam, status: myTeamStatus } = useSelector(state => state.myTeam);
  const fetchMyTeamSucceeded = myTeamStatus === FETCH_MY_TEAM_SUCCEEDED;
  const fetchMyTeamFailed = myTeamStatus === FETCH_MY_TEAM_FAILED;

  const allEmployees = [];
  if (fetchPersonalGoalsSucceeded && fetchLimitsSucceeded)
    allEmployees.push(selfEmployee);

  if (fetchMyTeamSucceeded) {
    const teamMembers = myTeam.employees.map(employee => {
      const newEmployeeGoals = newGoals.filter(newGoal => newGoal.employeeId === employee.id).map(newGoal => {
        return { topicId: newGoal.topic.topicId, topic: newGoal.topic.topic, isRemovable: true };
      });
      return {
        id: employee.id,
        name: employee.name,
        goalTopics: [...employee.goalTopics, ...newEmployeeGoals],
        limit: employee.limit,
      };
    });
    allEmployees.push(...teamMembers);
  }

  const loadingEmployeesSucceeded = fetchPersonalGoalsSucceeded && fetchMyTeamSucceeded && fetchLimitsSucceeded;
  const loadingEmployeesFailed = fetchPersonalGoalsFailed || fetchMyTeamFailed || fetchLimitsFailed;
  const loadingEmployees = !loadingEmployeesSucceeded && !loadingEmployeesFailed;

  return (
    <DndProvider backend={Backend}>
      <Container>
        <Row stretchViewsVertically>
          <Col span={5}>
            <Card stretchVertically>
              <Card.Header
                title="Topics"
                suffix={<Search debounceMs={250} clearButton={false} onChange={e => setTopicsFilter(e.target.value)} />}
              />
              <Card.Divider />
              <Card.Content>
                <Box height={DND_COLUMN_HEIGHT} direction="vertical" overflowY="auto">
                  {loadingTopics && <LoadingIndicator text="Loading topics..." />}
                  {fetchTopicsSucceeded && filteredTopics.map(topic => <Topic key={topic.id} topic={topic} />)}
                  {fetchTopicsFailed && <Text>Failed to load topics</Text>}
                  <IconButton className={s.floatingButton} as="button" size="medium" onClick={() => setIsOpenedCreateTopicModal(true)}>
                    <Add />
                  </IconButton>
                </Box>
                {isOpenedCreateTopicModal && <CreateTopicModal isModalOpened={isOpenedCreateTopicModal} onCloseModal={() => setIsOpenedCreateTopicModal(false)} />}
              </Card.Content>
            </Card>
          </Col>
          <Col span={7}>
            <Card stretchVertically>
              <Card.Header title="Team Members" />
              <Card.Divider />
              <Card.Content>
                <Box height={DND_COLUMN_HEIGHT} direction="vertical" overflowY="auto">
                  {loadingEmployees && <LoadingIndicator text="Loading employees..." />}
                  {loadingEmployeesSucceeded && allEmployees.map(employee => <Employee key={employee.id} employee={employee} />)}
                  {loadingEmployeesFailed && <Text>Failed to load employees</Text>}
                </Box>
              </Card.Content>
            </Card>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default GoalsAssignComponent;
