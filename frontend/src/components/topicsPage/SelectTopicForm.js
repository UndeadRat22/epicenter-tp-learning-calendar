import React, { useState, useEffect } from 'react';
import {
  FormField,
  AutoComplete,
} from 'wix-style-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTopics } from '../../state/actions/allTopics';

const SelectTopicForm = ({ onSelectTopic }) => {
  const [value, setValue] = useState('');

  const topics = useSelector(state => state.allTopics.topics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTopics());
  }, []);

  const getOptions = () => {
    let reformattedArray = [];
    if (topics !== null) {
      reformattedArray = topics.map(obj => {
        return { id: obj.id, value: obj.subject };
      });
    }
    return reformattedArray;
  };

  const onSelect = option => {
    setValue(option.value);
    onSelectTopic(option.id);
  };

  const onChange = event => {
    setValue(event.target.value);
  };

  return (
    <FormField label="Select parent topic">
      <AutoComplete
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

export default SelectTopicForm;
