/**
 * @Date:   2019-10-24T13:25:40+01:00
 * @Last modified time: 2019-11-11T12:45:21+00:00
 */

 import { createStore, applyMiddleware, compose } from 'redux';
 import thunk from 'redux-thunk';
 import logger from 'redux-logger';

 import rootReducer from './reducers';

 const middleware = applyMiddleware(thunk, logger);

 const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 const store = createStore(
     rootReducer,
     reduxDevTools(
         middleware
     )
 );

 export default store;
