import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import messagesReducer from './reducers/messages';
import authReducer from './reducers/auth'
import uiReducer from './reducers/ui';


const rootReducer = combineReducers({
    messages: messagesReducer,
    auth: authReducer,
    ui: uiReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;