/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import {
  FormField,
  AutoComplete,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { getSubordinates } from '../../state/actions/subordinates';

const SelectSubordinateForm = ({ onSelectSubordinate, isDisabled = true }) => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubordinates());
  }, []);

  const { subordinates } = useSelector(state => state.subordinates);

  const getOptions = () => {
    let reformattedArray = [];
    if (subordinates.length !== 0) {
      reformattedArray = subordinates.employees.map(subordinate => {
        return { id: subordinate.id, value: subordinate.fullName };
      });
    }
    return reformattedArray;
  };

  const onSelect = option => {
    setValue(option.value);
    onSelectSubordinate(option.id);
  };

  const onChange = event => {
    setValue(event.target.value);
  };

  return (
    <FormField label="Select subordinate">
      <AutoComplete
        disabled={isDisabled}
        options={getOptions()}
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

export default SelectSubordinateForm;
