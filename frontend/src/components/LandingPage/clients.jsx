import React from 'react'
import clientsData from './data'

const Clients = () => (
  <div className="hero-foot">
  <div className="container">
    <div className="tabs partner-tabs is-centered">
    <ul>
      {clientsData.map(({ source, alt, href }) => (
        <li>
          <a href target="_blank">
            <img
              className="partner-logo"
              src={source}
              alt
            />
          </a>
        </li>
      ))}
    </ul>
    </div>
      </div>
    </div>
)

export default Clients
