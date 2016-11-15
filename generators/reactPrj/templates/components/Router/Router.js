import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRoute } from 'react-router';
import {
  Layout,
  IndexPage,
} from 'components';

export default class AppRouter extends Component {
  render() {
  return  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={IndexPage} />
      {/* routes generator: dot remove comment */}
    </Route>
  </Router>;
  }
}
