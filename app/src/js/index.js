import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '../stores/configureStore'
import Home from './components/Home'

render(<Home />, document.getElementById('app'));
