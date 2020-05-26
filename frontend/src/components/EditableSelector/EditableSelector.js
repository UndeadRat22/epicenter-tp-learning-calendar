/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import Add from 'wix-ui-icons-common/Add';
import Delete from 'wix-ui-icons-common/Delete';

import {
  Selector, Text, Button, IconButton, TextButton,
} from 'wix-style-react';
import EditableRow from './EditableRow';
import WixComponent from './WixComponent';
import styles from './EditableSelector.scss';
import { LEARNED } from '../../constants/ProgressStatus';

class EditableSelector extends WixComponent {
  static propTypes = {
    title: PropTypes.string,
    toggleType: PropTypes.oneOf(['checkbox', 'radio']),
    newRowLabel: PropTypes.string,
    editButtonText: PropTypes.string,
    onOptionAdded: PropTypes.func,
    onOptionEdit: PropTypes.func,
    onOptionDelete: PropTypes.func,
    onOptionToggle: PropTypes.func,
    topics: PropTypes.array,
  };

  static defaultProps = {
    toggleType: 'checkbox',
    newRowLabel: 'New Row',
    editButtonText: 'Edit',
  };

  state = {
    addingNewRow: false,
    editingRow: null,
  };

  addNewRow = () => {
    this.setState({ addingNewRow: true, editingRow: false });
  };

  editItem = index => {
    this.setState({ editingRow: index, addingNewRow: false });
  };

  deleteItem = index => {
    this.props.onOptionDelete && this.props.onOptionDelete({ index });
  };

  onNewOptionApprove = ({ newTopicSubject, newTopicId, index }) => {
    if (this.state.addingNewRow)
      this.props.onOptionAdded && this.props.onOptionAdded({ newTopicSubject, newTopicId });
    else
      this.props.onOptionEdit && this.props.onOptionEdit({ newTopicId, newTopicSubject, index });

    this.setState({
      addingNewRow: false,
      editingRow: null,
    });
  };

  onNewOptionCancel = () => {
    this.setState({
      addingNewRow: false,
      editingRow: null,
    });
  };

  onOptionToggle = id => {
    this.props.onOptionToggle && this.props.onOptionToggle(id);
  };

  renderInput = (topic, index) => {
    return (
      <EditableRow
        notIncludedTopicIds={this.props.topics.filter(x => x.id !== topic.id)}
        key={index}
        topic={topic}
        dataHook="edit-row-wrapper"
        onApprove={(newTopicId, newTopicSubject) => this.onNewOptionApprove({ newTopicId, newTopicSubject, index })}
        onCancel={() => this.onNewOptionCancel()}
      />
    );
  };

  render() {
    const {
      title, newRowLabel, editButtonText, toggleType,
    } = this.props;
    let { topics } = this.props;
    topics = topics || [];
    return (
      <div>
        {title && (
          <div className={styles.title} data-hook="editable-selector-title">
            <Text weight="normal">{title}</Text>
          </div>
        )}
        <div>
          {topics.map((topic, index) => (this.state.editingRow === index ? (
            this.renderInput(topic, index)
          ) : (
            <div
              data-hook="editable-selector-row"
              className={styles.row}
              key={index}
            >
              <Selector
                dataHook="editable-selector-item"
                id={index}
                title={topic.subject}
                isSelected={topic.progressStatus === LEARNED}
                toggleType={toggleType}
                onToggle={id => this.onOptionToggle(id)}
              />
              <div className={styles.optionMenu}>
                <IconButton
                  onClick={() => this.deleteItem(index)}
                  dataHook="delete-item"
                  type="button"
                  size="small"
                  skin="inverted"
                >
                  <span>
                    <Delete />
                  </span>
                </IconButton>
                <div className={styles.editRow}>
                  <Button
                    onClick={() => this.editItem(index)}
                    dataHook="edit-item"
                    size="small"
                  >
                    {editButtonText}
                  </Button>
                </div>
              </div>
            </div>
          )))}
        </div>
        {this.state.addingNewRow && this.renderInput()}
        <div className={styles.newRowButton}>
          <TextButton
            as="a"
            underline="none"
            onClick={this.addNewRow}
            prefixIcon={<Add className={styles.icon} />}
            dataHook="new-row-button-text"
          >
            {newRowLabel}
          </TextButton>
        </div>
      </div>
    );
  }
}

EditableSelector.displayName = 'EditableSelector';

export default EditableSelector;
