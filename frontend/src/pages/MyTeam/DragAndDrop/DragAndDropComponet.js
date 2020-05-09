import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import Employee from './Employee';
import Topic from './Topic';

import InitialData from './InitialData';

const DragAndDropComponent = () => {
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
            {InitialData.topics.map(topic => {
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
            {InitialData.employees.map(employee => {
              const topics = InitialData.topics.filter(topic => employee.topicIds.find(topicId => topicId === topic.id));
              return <Employee key={employee.id} employee={employee} topics={topics} />;
            })}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDropComponent;
