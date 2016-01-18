import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import configureStore from '../stores/configureStore'
import App from './container/App'

const store = configureStore()

render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
