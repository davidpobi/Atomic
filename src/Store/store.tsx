import allReducers from './reducers';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

let store = createStore(
    allReducers,
     compose(
      process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? (applyMiddleware(thunk),(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()):""
    )
    );
  


export default store;