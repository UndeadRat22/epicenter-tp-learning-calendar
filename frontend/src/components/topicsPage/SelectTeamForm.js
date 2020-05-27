/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import {
  FormField,
  AutoComplete,
} from 'wix-style-react';
import { useSelector } from 'react-redux';

const SelectTeamForm = ({ onSelectTeam, isDisabled = true, onSearchAndDropDownMissmatch }) => {
  const [value, setValue] = useState('');

  const { subordinates } = useSelector(state => state.subordinates);


  const getTeams = () => {
    let teams = [];

    if (subordinates.length !== 0) {
      teams = subordinates.employees.map(subordinate => {
        if (subordinate.managedEmployeesCount > 0) {
          const teamName = subordinate.fullName.concat(' Team (', subordinate.managedEmployeesCount, ' members)');
          return { id: subordinate.id, value: teamName };
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
  );
};

export default SelectTeamForm;
