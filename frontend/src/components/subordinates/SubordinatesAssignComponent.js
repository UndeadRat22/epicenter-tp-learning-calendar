import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import {
  Container, Row, Col, Box, Card, Search, Text,
} from 'wix-style-react';
import {
  LOADING_SUBORDINATES, FETCH_SUBORDINATES_SUCCEEDED, FETCH_SUBORDINATES_FAILED,
} from '../../constants/SubordinatesStatus';
import {
  FETCH_MY_TEAM_SUCCEEDED, FETCH_MY_TEAM_FAILED,
} from '../../constants/MyTeamStatus';
import { DND_COLUMN_HEIGHT } from '../../constants/Styling';
import LoadingIndicator from '../LoadingIndicator';
import Employee from './Employee';
import Team from './Team';

const SubordinatesAssignComponent = () => {
  const [employeesFilter, setEmployeesFilter] = useState('');
  const [teamsFilter, setTeamsFilter] = useState('');

  const { status: myTeamStatus, myTeam } = useSelector(state => state.myTeam);
  const fetchMyTeamSucceeded = myTeamStatus === FETCH_MY_TEAM_SUCCEEDED;
  const fetchMyTeamFailed = myTeamStatus === FETCH_MY_TEAM_FAILED;

  const { id, firstName, lastName } = useSelector(state => state.auth.user);
  const myFullName = `${firstName} ${lastName}`;

  const filteredEmployees = [];
  const filteredTeamManagers = [];

  if (fetchMyTeamSucceeded && myFullName.toLowerCase().indexOf(teamsFilter.toLowerCase()) !== -1) {
    const myTeamMembersCount = myTeam.employees.length;
    filteredTeamManagers.push({
      id, fullName: myFullName, managedEmployeesCount: myTeamMembersCount, isSelf: true,
    });
  }

  const { status: subordinatesStatus, subordinates } = useSelector(state => state.subordinates);
  const loadingSubordinates = subordinatesStatus === LOADING_SUBORDINATES;
  const fetchSubordinatesSucceeded = subordinatesStatus === FETCH_SUBORDINATES_SUCCEEDED;
  const fetchSubordinatesFailed = subordinatesStatus === FETCH_SUBORDINATES_FAILED;

  if (fetchSubordinatesSucceeded) {
    filteredEmployees.push(...subordinates.employees.filter(employee => employee.fullName.toLowerCase().indexOf(employeesFilter.toLowerCase()) !== -1));
    filteredTeamManagers.push(...subordinates.employees.filter(employee => employee.fullName.toLowerCase().indexOf(teamsFilter.toLowerCase()) !== -1));
  }

  const fetchTeamsSucceeded = fetchSubordinatesSucceeded && fetchMyTeamSucceeded;
  const fetchTeamsFailed = fetchSubordinatesFailed || fetchMyTeamFailed;
  const loadingTeams = !fetchTeamsSucceeded && !fetchTeamsFailed;

  return (
    <DndProvider backend={Backend}>
      <Container>
        <Row stretchViewsVertically>
          <Col span={6}>
            <Card stretchVertically>
              <Card.Header
                title="Employees"
                suffix={<Search debounceMs={250} clearButton={false} onChange={e => setEmployeesFilter(e.target.value)} />}
              />
              <Card.Divider />
              <Card.Content>
                <Box height={DND_COLUMN_HEIGHT} direction="vertical" overflowY="auto">
                  {loadingSubordinates && <LoadingIndicator text="Loading employees..." />}
                  {fetchSubordinatesSucceeded && filteredEmployees.map(employee => <Employee key={employee.id} employee={employee} />)}
                  {fetchSubordinatesFailed && <Text>Failed to load employees</Text>}
                </Box>
              </Card.Content>
            </Card>
          </Col>
          <Col span={6}>
            <Card stretchVertically>
              <Card.Header
                title="Teams"
                suffix={<Search debounceMs={250} clearButton={false} onChange={e => setTeamsFilter(e.target.value)} />}
              />
              <Card.Divider />
              <Card.Content>
                <Box height={DND_COLUMN_HEIGHT} direction="vertical" overflowY="auto">
                  {loadingTeams && <LoadingIndicator text="Loading teams..." />}
                  {fetchTeamsSucceeded && filteredTeamManagers.map(manager => <Team key={manager.id} teamManager={manager} />)}
                  {fetchTeamsFailed && <Text>Failed to load teams</Text>}
                </Box>
              </Card.Content>
            </Card>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default SubordinatesAssignComponent;
