import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import  ReduxDevTools  from 'nlx-react-common';
import thunk from 'redux-thunk';


const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  ReduxDevTools.instrument( { maxAge: 50, shouldCatchErrors: true })
));
export default store;
