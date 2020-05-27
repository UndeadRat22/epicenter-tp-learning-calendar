/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import {
  FormField,
  AutoComplete,
} from 'wix-style-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getTeams } from '../../state/actions/teams';

const SelectTeamForm = ({ onSelectTeam, isDisabled = true }) => {
  const [value, setValue] = useState('');

  // Implement when the endpoint (GET teams) will be created
  /*
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  const { teams } = useSelector(state => state.teams);

  const getOptions = () => {
    let reformattedArray = [];
    if (teams.length !== 0) {
      reformattedArray = teams.map(team => {
        return { id: team.id, value: team.fullName };
      });
    }
    return reformattedArray;
  };
  */


  const onSelect = option => {
    setValue(option.value);
    onSelectTeam(option.id);
  };

  const onChange = event => {
    setValue(event.target.value);
  };

  return (
    <FormField label="Select team">
      <AutoComplete
        disabled={isDisabled}
        options={[]}
        // options={getOptions()}
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
