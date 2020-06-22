import React, { useState } from 'react'
import './style.scss'

import qubiclesLogo from '../../../../assets/images/qbe-dark.png'
import logo from '../../../../assets/images/logo.svg'
import AgentMultipartForm from './AgentMultipartForm'
import ContactCenterMultipartForm from './ContactCenterMultipartForm'

const PostSignUp = () => {
  const [ role, setRole ] = useState(null)
  return (
    <div className="signup-wrapper">
      <div className="fake-nav">
        <img className="qubicles-logo" src={ qubiclesLogo } width={ 180 } height={ 28 } alt="" />
      </div>
      {(!role) && (
      <>
        <div className="outer-panel">
          <div className="outer-panel-inner">
            <div className="process-title">
              <h2 id="step-title-1" className="step-title is-active">
                Welcome. How do you intend on using Qubicles?
              </h2>
            </div>
            <div id="signup-panel-1" className="process-panel-wrap is-active">
              <div className="role-selector">
                <div className="column is-4">
                  <div className="account-type">
                    <img src={ logo } alt="" />
                    <h3>For a Contact Center</h3>
                    <p>
                      Operating inbound, outbound,  blended or multi-channel programs for a new or existing contact center
                    </p>
                    <button
                      type="button"
                      className="button is-fullwidth is-rounded process-button"
                      data-step="step-dot-2"
                      onClick={ () => setRole('employer') }
                    >
                      Continue
                    </button>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="account-type">
                    <img src={ logo } alt="" />
                    <h3>As an Agent or Manager</h3>
                    <p>
                      Handle customer interactions, quality assurance, training or support for contact centers
                    </p>
                    <button
                      type="button"
                      className="button is-fullwidth is-rounded process-button"
                      data-step="step-dot-2"
                      onClick={ () => setRole('agent') }
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      )}
      { role === 'agent' && <AgentMultipartForm role={ role } />}
      { role === 'employer' && <ContactCenterMultipartForm role={ role } />}
    </div>
  )
}

export default PostSignUp
