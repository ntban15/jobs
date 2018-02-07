// create redux store
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage, // default is AsyncStorage
    whitelist: ['likedJobs'] // only persist likedJobs piece of state
}

// enhance current reducers with persistConfig
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducer, // need some reducers
    {}, // default state
    compose(
        applyMiddleware(thunk) // apply thunk as middleware
    )
);

export const persistor = persistStore(store);