import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';

import {
 Main,
} from 'components';


ReactDOM.render(<Main store={store}/>, document.getElementById('content'));
