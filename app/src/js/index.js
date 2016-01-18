import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore } from '../stores/configureStore'
import App from './container/App'
import rootReducer from './reducers/reducers'

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware,loggerMiddleware)(createStore)

const store = createStoreWithMiddleware(rootReducer)

render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
