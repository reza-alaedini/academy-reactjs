import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./../Reducers/reducers";
import { getCourses } from './../Actions/courses';

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

//initialize
store.dispatch(getCourses());

//subscribe
store.subscribe(() => console.log(store.getState()));
