import React from 'react';
import {
  Container, Row, Col, EmptyState, Tag,
} from 'wix-style-react';

const GoalsCard = () => {
  return (
    <EmptyState
      align="left"
      title="Goals"
      subtitle="Topics you should consider delving into"
      theme="page"
    >
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Tag removable={false} size="medium" theme="dark">C#</Tag>
        <Tag removable={false} size="medium" theme="dark">Functional programming in Java</Tag>
        <Tag removable={false} size="medium" theme="dark">Functional programming in Java</Tag>
        <Tag removable={false} size="medium" theme="dark">Functional programming in Java</Tag>
      </div>
    </EmptyState>
  );
};

export default GoalsCard;
