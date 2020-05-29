/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AutoComplete, Box, FormField } from 'wix-style-react';

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
      <FormField label="Select team" infoContent="Only available when Single Team tree is selected">
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
