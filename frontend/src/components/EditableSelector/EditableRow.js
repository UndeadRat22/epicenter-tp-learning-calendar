/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import X from 'wix-ui-icons-common/X';
import Check from 'wix-ui-icons-common/Check';

import {
  Input, Tooltip, IconButton, Dropdown,
} from 'wix-style-react';
import styles from './EditableSelector.scss';
import SelectTopicForm from '../topicsPage/SelectTopicForm';

class EditableRow extends Component {
  static propTypes = {
    newOption: PropTypes.string,
    onApprove: PropTypes.func,
    onCancel: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      newOption: props.newOption || '',
    };
  }

  componentDidMount() {
    // this.input.focus();
  }

  onApprove = () => {
    this.props.onApprove && this.props.onApprove(this.state.newOption);
  };

  onCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  render() {
    const { dataHook } = this.props;
    return (
      <div data-hook={dataHook} className={styles.editableRowContainer}>
        <div className={styles.editableRowInputWrap}>
        <SelectTopicForm />
        </div>

        <div className={styles.editableRowButtons}>
          <Tooltip content="Cancel" timeout={0}>
            <IconButton
              onClick={this.onCancel}
              size="medium"
              priority="secondary"
              dataHook="edit-row-cancel-button"
            >
              <X />
            </IconButton>
          </Tooltip>

          <Tooltip content="Confirm" timeout={0}>
            <IconButton
              onClick={this.onApprove}
              size="medium"
              disabled={this.state.newOption.length === 0}
              dataHook="edit-row-approve-button"
            >
              <Check />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default EditableRow;
