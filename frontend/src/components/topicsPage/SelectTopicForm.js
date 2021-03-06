/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import {
  FormField,
  AutoComplete,
} from 'wix-style-react';
import { useSelector } from 'react-redux';

const SelectTopicForm = ({
  onSelectTopic, parentTopic = '', onParentTopicSubjectChange, onSearchAndDropDownMissmatch, title = '',
  notIncludedTopicIds = [],
}) => {
  const [value, setValue] = useState(parentTopic);

  const topics = useSelector(state => state.allTopics.topics)
    .filter(topic => !notIncludedTopicIds.some(notIncludedTopic => notIncludedTopic.id === topic.id));

  const getOptions = () => {
    let reformattedArray = [];
    reformattedArray = topics.map(obj => {
      return { id: obj.id, value: obj.subject };
    });
    return reformattedArray;
  };

  const onSelect = option => {
    setValue(option.value);
    onSelectTopic(option.id);
    onParentTopicSubjectChange(option.value);
    onSearchAndDropDownMissmatch && onSearchAndDropDownMissmatch(false);
  };

  const onChange = event => {
    setValue(event.target.value);
    onParentTopicSubjectChange && onParentTopicSubjectChange(event.target.value);
    onSearchAndDropDownMissmatch && onSearchAndDropDownMissmatch(true);
  };

  return (
    <FormField label={title}>
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
