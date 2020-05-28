/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import {
  FormField,
  AutoComplete,
  Box,
  InfoIcon,
} from 'wix-style-react';
import { useSelector } from 'react-redux';

const SelectTeamForm = ({ onSelectTeam, isDisabled = true, onSearchAndDropDownMissmatch }) => {
  const [value, setValue] = useState('');

  const { subordinates } = useSelector(state => state.subordinates);


  const getTeams = () => {
    const teams = [];
    if (subordinates.length !== 0) {
      subordinates.employees.forEach(subordinate => {
        if (subordinate.managedEmployeesCount > 0) {
          const teamName = subordinate.fullName.concat(' Team (', subordinate.managedEmployeesCount, ' members)');
          const team = { id: subordinate.id, value: teamName };
          teams.push(team);
        }
      });
    }
    return teams;
  };


  const onSelect = option => {
    setValue(option.value);
    onSelectTeam(option.id);
    onSearchAndDropDownMissmatch && onSearchAndDropDownMissmatch(false);
  };

  const onChange = event => {
    setValue(event.target.value);
    onSearchAndDropDownMissmatch && onSearchAndDropDownMissmatch(true);
  };

  return (
    <Box>
      <Box marginLeft="tiny">
        <InfoIcon content='Disabled until "Single team" tree is selected' />
      </Box>
      <FormField label="Select team">
        <AutoComplete
          disabled={isDisabled}
          options={getTeams()}
          value={value}
          onChange={onChange}
          onSelect={onSelect}
          placeholder="Search"
          emptyStateMessage={`Couldn't find: ${value}`}
          predicate={option => option.value.toLowerCase().indexOf(value.toLowerCase()) !== -1}
        />
      </FormField>
    </Box>
  );
};

export default SelectTeamForm;
