import React from 'react';
import { Layout, Cell, FloatingNotification } from 'wix-style-react';

const Notification = ({ type, text, onClose }) => {
  return (
    <Layout>
      <Cell>
        <FloatingNotification
          type={type}
          text={text}
          onClose={() => onClose()}
        />
      </Cell>
    </Layout>
  );
};

export default Notification;
