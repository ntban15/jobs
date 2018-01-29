// create redux store
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(
    reducers, // need some reducers
    {}, // default state
    compose(
        applyMiddleware(thunk) // apply thunk as middleware
    )
);

export default store;