import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Box, Page, Loader,
} from 'wix-style-react';
import { Check, X } from 'wix-ui-icons-common';
import s from './MyTeam.scss';
import { saveGoals, resetGoals } from '../state/actions/assignGoals';
import {
  NO_NEW_GOALS, NEW_GOALS_ADDED, SAVING_GOALS, SAVE_GOALS_SUCCEEDED, SAVE_GOALS_FAILED,
} from '../constants/AssignGoalsStatus';
import DragAndDropComponent from '../components/dragAndDrop/DragAndDropComponet';

const MyTeam = () => {
  const dispatch = useDispatch();

  const reset = () => {
    dispatch(resetGoals());
  };

  const save = () => {
    dispatch(saveGoals());
  };

  const { newGoalsStatus, saveGoalsStatus } = useSelector(state => state.assignGoals);

  const savingInProgress = saveGoalsStatus === SAVING_GOALS;
  const savingSucceeded = saveGoalsStatus === SAVE_GOALS_SUCCEEDED;
  const savingFailed = saveGoalsStatus === SAVE_GOALS_FAILED;

  const getSaveButtonRepresentation = () => {
    if (savingInProgress)
      return { saveButtonIcon: <Box align="center" verticalAlign="middle"><Loader size="tiny" /></Box>, saveButtonText: 'Saving' };

    if (savingSucceeded)
      return { saveButtonIcon: <Check />, saveButtonText: 'Saved' };

    if (savingFailed)
      return { saveButtonIcon: <X />, saveButtonText: 'Failed' };

    return { saveButtonIcon: undefined, saveButtonText: 'Save' };
  };

  const { saveButtonIcon, saveButtonText } = getSaveButtonRepresentation();

  const areButtonsEnabled = !savingInProgress; // status === NEW_GOALS_ADDED;

  const ActionBar = () => {
    return (
      <Box>
        <Box marginRight="small">
          <Button skin="light" onClick={reset} disabled={!areButtonsEnabled}>
            Reset
          </Button>
        </Box>
        <Box>
          <Button
            onClick={save}
            disabled={!areButtonsEnabled}
            prefixIcon={saveButtonIcon}
          >
            {saveButtonText}
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Page className={s.myTeamPage} height="1000px">
      <Page.Header title="My Team" actionsBar={<ActionBar />} />
      <Page.Content>
        <DragAndDropComponent />
      </Page.Content>
    </Page>
  );
};

export default MyTeam;
