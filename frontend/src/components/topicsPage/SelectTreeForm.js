import React, { useState } from 'react';
import {
  Container,
  Dropdown,
  Box,
  FormField,
  Button,
} from 'wix-style-react';
import { useDispatch } from 'react-redux';
import {
  PERSONAL, MY_TEAM, MY_SUBORDINATES, SINGLE_SUBORDINATE, SINGLE_TEAM,
} from '../../constants/TreeTypes';
import { showWarningToast } from '../../state/actions/toast';
import SelectSubordinateForm from './SelectSubordinateForm';
import SelectTeamForm from './SelectTeamForm';

const SelectTreeForm = ({ onSelect }) => {
  const [tree, setTree] = useState(PERSONAL);
  const [subordinateId, setSubordinateId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [isDisabledSubordinate, setIsDisabledSubordinate] = useState(true);
  const [isDisabledTeam, setIsDisabledTeam] = useState(true);
  const [isSearchAndDropDownMissmatched, setIsSearchAndDropDownMissmatched] = useState(false);

  const dispatch = useDispatch();

  const handleDropdownSelect = event => {
    const { value } = event;
    setTree(value);
    switch (value) {
      case SINGLE_SUBORDINATE:
        setIsDisabledSubordinate(false);
        setIsDisabledTeam(true);
        break;
      case SINGLE_TEAM:
        setIsDisabledTeam(false);
        setIsDisabledSubordinate(true);
        break;
      default:
        setIsDisabledSubordinate(true);
        setIsDisabledTeam(true);
    }
  };

  const handleShowBtn = () => {
    let selectedTree;
    switch (tree) {
      case SINGLE_SUBORDINATE:
        if (subordinateId === '')
          dispatch(showWarningToast('Choose subordinate!'));
        else if (!isSearchAndDropDownMissmatched)
          selectedTree = { value: tree, additionalParametersId: subordinateId };
        else if (isSearchAndDropDownMissmatched)
          dispatch(showWarningToast('Choose subordinate!'));
        break;
      case SINGLE_TEAM:
        if (teamId === '')
          dispatch(showWarningToast('Choose team!'));
        else if (!isSearchAndDropDownMissmatched)
          selectedTree = { value: tree, additionalParametersId: teamId };
        else if (isSearchAndDropDownMissmatched)
          dispatch(showWarningToast('Choose team!'));
        break;
      default:
        selectedTree = { value: tree, additionalParametersId: null };
    }
    onSelect(selectedTree);
  };

  return (
    <Container fluid>
      <Box align="space-between" verticalAlign="bottom">
        <FormField label="Select tree">
          <Dropdown
            placeholder="Select"
            options={[
              { id: 0, value: PERSONAL },
              { id: 1, value: MY_TEAM },
              { id: 2, value: MY_SUBORDINATES },
              { id: 3, value: SINGLE_SUBORDINATE },
              { id: 4, value: SINGLE_TEAM },
            ]}
            onSelect={event => handleDropdownSelect(event)}
          />
        </FormField>
        <SelectSubordinateForm
          onSelectSubordinate={selectedSubordinate => setSubordinateId(selectedSubordinate)}
          isDisabled={isDisabledSubordinate}
          onSearchAndDropDownMissmatch={x => setIsSearchAndDropDownMissmatched(x)}
        />
        <SelectTeamForm
          onSelectTeam={selectedTeam => setTeamId(selectedTeam)}
          isDisabled={isDisabledTeam}
          onSearchAndDropDownMissmatch={x => setIsSearchAndDropDownMissmatched(x)}
        />
        <Button
          as="button"
          onClick={() => handleShowBtn()}
        >
          Show tree
        </Button>
      </Box>
    </Container>
  );
};

export default SelectTreeForm;
