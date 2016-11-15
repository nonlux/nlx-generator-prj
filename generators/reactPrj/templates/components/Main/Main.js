import React, {Component, PropTypes} from 'react';
import {
  Root,
} from 'nlx-react-common';

import {
  Router,
} from 'components';

export default class Main extends Component {
  render() {
    const { store } = this.props;
    return (
    <Root store={store}>
      <Router/>
    </Root>
    );
  }
}
