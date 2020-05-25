/* eslint-disable no-return-assign */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import X from 'wix-ui-icons-common/X';
import Check from 'wix-ui-icons-common/Check';

import { Input, Tooltip, IconButton } from 'wix-style-react';
import styles from './EditableSelector.scss';

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
    this.input.focus();
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
          <Input
            ref={input => (this.input = input)}
            className={styles.editableRowInput}
            dataHook="edit-row-input"
            value={this.state.newOption}
            onChange={event => this.setState({ newOption: event.target.value })}
            onEnterPressed={() => this.onApprove()}
            onEscapePressed={() => this.onCancel()}
            size="normal"
            textOverflow="clip"
            theme="normal"
            width="initial"
          />
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
