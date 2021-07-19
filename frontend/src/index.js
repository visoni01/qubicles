import React from 'react'
import TagManager from 'react-gtm-module'
import ReactDOM from 'react-dom'
import App from './App'
import 'bulma/css/bulma.css'
import config from './utils/config'
import { getUserDetails } from './utils/common'
import WebSocket from './socket'
import listeners from './socket/listeners'

const tagManagerArgs = {
  gtmId: config.GOOGLE_TAG_MANAGER_ID,
}

const userDetails = getUserDetails()

WebSocket.initialize({ userId: userDetails && userDetails.user_id, listeners })

TagManager.initialize(tagManagerArgs)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
