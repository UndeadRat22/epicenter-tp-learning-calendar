import React, { useState, useEffect } from 'react';
import { Box, Loader, Button } from 'wix-style-react';
import Check from 'wix-ui-icons-common/Check';
import X from 'wix-ui-icons-common/X';

const getSaveButtonAppearance = (savingInProgress, savingSucceeded, savingFailed) => {
  if (savingInProgress) {
    return {
      saveButtonIcon: (
        <Box align="center" verticalAlign="middle">
          <Loader size="tiny" />
        </Box>),
      saveButtonText: 'Saving',
    };
  }

  if (savingSucceeded)
    return { saveButtonIcon: <Check />, saveButtonText: 'Saved' };

  if (savingFailed)
    return { saveButtonIcon: <X />, saveButtonText: 'Failed' };

  return { saveButtonText: 'Save' };
};

const ResetSaveButtonsBox = ({
  anyChangesMade, onReset, onSave, savingSucceeded, savingFailed,
}) => {
  const [savingInProgress, setSavingInProgress] = useState(false);
  const [succeeded, setSucceded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (savingSucceeded || savingFailed)
      setSavingInProgress(false);
    if (savingSucceeded)
      setSucceded(true);
    if (savingFailed)
      setFailed(true);
  }, [savingSucceeded, savingFailed]);

  useEffect(() => {
    if (anyChangesMade && succeeded)
      setSucceded(false);
    else if (!anyChangesMade && failed)
      setFailed(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anyChangesMade]);

  const { saveButtonIcon, saveButtonText } = getSaveButtonAppearance(savingInProgress, succeeded, failed);
  const bothButtonsDisabled = !anyChangesMade || savingInProgress;

  const onResetWrapper = () => {
    onReset();
  };

  const onSaveWrapper = () => {
    setSavingInProgress(true);
    onSave();
  };

  return (
    <Box>
      <Box marginRight="small">
        <Button onClick={onResetWrapper} skin={bothButtonsDisabled ? 'standard' : 'light'} priority={bothButtonsDisabled ? 'secondary' : 'primary'} disabled={bothButtonsDisabled}>
          Reset
        </Button>
      </Box>
      <Box>
        <Button onClick={onSaveWrapper} skin={!bothButtonsDisabled && failed ? 'destructive' : 'standard'} disabled={bothButtonsDisabled} prefixIcon={saveButtonIcon}>
          {saveButtonText}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetSaveButtonsBox;
