import React from 'react'
import { clients } from './data'

const Clients = () => (
  <div className='hero-foot'>
    <div className='container'>
      <div className='tabs partner-tabs is-centered'>
        <ul>
          {clients.map(({ source, alt, href }) => (
            <li key={ `${ alt }-${ href }` }>
              <a href={ href } target='_blank' rel='noopener noreferrer'>
                <img
                  className='partner-logo'
                  src={ source }
                  alt={ alt }
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
