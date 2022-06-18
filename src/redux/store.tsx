import allReducers from '../redux/reducers';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

let store = createStore(
    allReducers,
     compose(
      applyMiddleware(thunk),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
    );
  
  
  /** Subscribe to display store */
  store.subscribe(() => {
   console.log(store.getState());
  });
  

export default store;