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
import { DND_COLUMN_HEIGHT } from '../../constants/Styling';
import LoadingIndicator from '../LoadingIndicator';

const SubordinatesAssignComponent = () => {
  const [employeesFilter, setEmployeesFilter] = useState('');
  const [teamsFilter, setTeamsFilter] = useState('');

  const { status, subordinates } = useSelector(state => state.subordinates);

  const loadingSubordinates = status === LOADING_SUBORDINATES;
  const fetchSubordinatesSucceeded = status === FETCH_SUBORDINATES_SUCCEEDED;
  const fetchSubordinatesFailed = status === FETCH_SUBORDINATES_FAILED;

  let filteredEmployees = [];
  let filteredTeams = [];
  if (fetchSubordinatesSucceeded) {
    filteredEmployees = subordinates.employees.filter(employee => employee.fullName.toLowerCase().indexOf(employeesFilter.toLowerCase()) !== -1);
    filteredTeams = subordinates.employees.filter(employee => employee.fullName.toLowerCase().indexOf(teamsFilter.toLowerCase()) !== -1);
  }

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
                  {fetchSubordinatesSucceeded && filteredEmployees.map(employee => {
                    return null;
                  })}
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
                  {loadingSubordinates && <LoadingIndicator text="Loading teams..." />}
                  {fetchSubordinatesSucceeded && filteredTeams.map(team => {
                    return null;
                  })}
                  {fetchSubordinatesFailed && <Text>Failed to load teams</Text>}
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
