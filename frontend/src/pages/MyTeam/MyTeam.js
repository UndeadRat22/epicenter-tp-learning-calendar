import React from 'react';
import { Page } from 'wix-style-react';
import DragAndDropComponent from './DragAndDrop/DragAndDropComponet';

const MyTeam = () => {
  return (
    <Page height="1000px">
      <Page.Header title="My Team" />
      <Page.Content>
        Here you can manage your team in a new and glorious way!
        <br />
        <DragAndDropComponent />
      </Page.Content>
    </Page>
  );
};

export default MyTeam;
