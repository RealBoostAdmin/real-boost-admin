import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist'
import {applyMiddleware, createStore} from 'redux';
import storage from 'redux-persist/lib/storage';
import {storeReducer} from './store.reducer';
import reduxThunk from 'redux-thunk';

const persistConfig = {
    key: 'store',
    storage,
}

const persistedReducer = persistReducer(persistConfig, storeReducer);

const middlewares = [reduxThunk];

if (process.env.NODE_ENV !== `production`) {
    const {logger} = require(`redux-logger`);
    middlewares.push(logger);
}

const middleware = applyMiddleware(...middlewares);
const devtools = composeWithDevTools(middleware)
const store = createStore(persistedReducer, devtools);
const persist = persistStore(store);

export {store, persist};
