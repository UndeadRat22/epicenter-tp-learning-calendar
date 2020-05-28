/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/sort-comp */
/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash/noop';
import { CloseButton, Text } from 'wix-style-react';
import ArrowDown from 'wix-ui-icons-common/ArrowDown';
import styles from './CustomTag.scss';

const tagToTextSize = {
  tiny: 'tiny',
  small: 'small',
  medium: 'small',
  large: 'medium',
};

/**
 * A Tag component
 */
class CustomTag extends React.PureComponent {
  static displayName = 'CustomTag';

  _renderThumb() {
    const { thumb } = this.props;
    return thumb ? <span className={styles.thumb}>{thumb}</span> : null;
  }

  _renderText() {
    const {
      size, children, disabled, theme,
    } = this.props;

    return (
      <Text
        skin={disabled ? 'disabled' : 'standard'}
        light={theme === 'dark'}
        secondary={theme !== 'dark'}
        ellipsis
        size={tagToTextSize[size]}
        weight={size === 'tiny' ? 'thin' : 'normal'}
      >
        {children}
      </Text>
    );
  }

  _renderRemoveButton() {
    const {
      removable, disabled, size, getIcon,
    } = this.props;
    if (removable) {
      return (
        <CloseButton
          skin="transparent"
          size={size === 'large' ? 'medium' : 'small'}
          disabled={disabled}
          className={styles.removeButton}
          onClick={this._handleRemoveClick}
        >
          {getIcon()}
        </CloseButton>
      );
    }
    return null;
  }

  _handleRemoveClick = event => {
    const { onRemove, id } = this.props;
    event.stopPropagation();
    onRemove(id);
  };

  _getClassName() {
    const {
      thumb,
      removable,
      size,
      disabled,
      theme,
      className,
      onClick,
    } = this.props;
    return classNames(
      styles.root,
      className,
      styles[`${theme}Theme`],
      styles[`${size}Size`],
      {
        [styles.withRemoveButton]: removable,
        [styles.withThumb]: thumb,
        [styles.disabled]: disabled,
        [styles.clickable]: onClick !== noop,
      },
    );
  }

  render() {
    const {
      id, onClick, maxWidth,
    } = this.props;

    return (
      <span
        className={this._getClassName()}
        id={id}
        onClick={event => onClick(id, event)}
        style={{ maxWidth: `${maxWidth}px` }}
      >
        {this._renderThumb()}
        {this._renderText()}
        {this._renderRemoveButton()}
      </span>
    );
  }
}

CustomTag.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */

  /** The text of the tag */
  children: PropTypes.node.isRequired,

  /** when set to true this component is disabled */
  disabled: PropTypes.bool,

  /** The id of the Tag  */
  id: PropTypes.string.isRequired,

  /** Callback function that pass `id` property as first parameter
   * and mouse event as second parameter when clicking on Tag */
  onClick: PropTypes.func,

  /** Callback function that pass `id` property as parameter when removing the Tag  */
  onRemove: PropTypes.func,

  /** If the Tag is removable then it will contain a small clickable X */
  removable: PropTypes.bool,

  /** The height of the Tag */
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),

  /** theme of the Tag */
  theme: PropTypes.oneOf([
    'standard',
    'error',
    'warning',
    'dark',
    'neutral',
    'light',
  ]),

  /** An optional thumb to display as part of the Tag */
  thumb: PropTypes.element,

  /** An optional maximum tag width in `px` for cropping. */
  maxWidth: PropTypes.number,

  /** Standard className which has preference over any other intrinsic classes  */
  className: PropTypes.string,
};

CustomTag.defaultProps = {
  onClick: noop,
  onRemove: noop,
  size: 'small',
  removable: true,
  theme: 'standard',
};

export default CustomTag;
