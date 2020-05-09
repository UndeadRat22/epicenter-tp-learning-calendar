import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import Employee from './Employee';
import Topic from './Topic';

const DragAndDropComponent = () => {
  const topics = useSelector(state => state.topics);
  const employees = useSelector(state => state.employees);

  return (
    <DndProvider backend={Backend}>
      <div style={{ display: 'flex' }}>
        <div style={{
          border: '1px solid lightgrey', borderRadius: '2px', margin: '8px', flex: '50%', display: 'flex', flexDirection: 'column',
        }}
        >
          <h3 style={{ padding: '8px', margin: '0px', fontWeight: 'normal' }}>
            Topics
          </h3>
          <div style={{ padding: '8px', backgroundColor: 'white', flexGrow: '1' }}>
            {topics.map(topic => {
              return <Topic key={topic.id} topic={topic} />;
            })}
          </div>
        </div>
        <div style={{
          border: '1px solid lightgrey', borderRadius: '2px', margin: '8px', flex: '50%', display: 'flex', flexDirection: 'column',
        }}
        >
          <h3 style={{ padding: '8px', margin: '0px', fontWeight: 'normal' }}>
            Employees
          </h3>
          <div style={{ padding: '8px', backgroundColor: 'white', flexGrow: '1' }}>
            {employees.map(employee => {
              return <Employee key={employee.id} employee={employee} />;
            })}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDropComponent;
