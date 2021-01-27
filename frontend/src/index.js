import React from 'react'
import TagManager from 'react-gtm-module'
import ReactDOM from 'react-dom'
import App from './App'
import 'bulma/css/bulma.css'
import config from './utils/config'

const tagManagerArgs = {
  gtmId: config.GOOGLE_TAG_MANAGER_ID,
}

TagManager.initialize(tagManagerArgs)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
