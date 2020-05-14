import React from 'react';
import { Page } from 'wix-style-react';
import DragAndDropComponent from './DragAndDrop/DragAndDropComponet';

const MyTeam = () => {
  return (
    <Page height="1000px">
      <Page.Header title="My Team" />
      <Page.Content>
        <DragAndDropComponent />
      </Page.Content>
    </Page>
  );
};

export default MyTeam;
