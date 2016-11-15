import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    const {children} = this.props;
    return (
      <div>
          {children}
      </div>);
  }
}
