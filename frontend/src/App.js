import React from 'react'
import { Provider } from 'react-redux'
import store from './redux-saga/store'
import Routes from './routes'
import './styles/scss/core.scss'
import './customStyles/scss/index.scss'

function App() {
  return (
    <Provider store={ store }>
      <Routes />
    </Provider>
  )
}

export default App
