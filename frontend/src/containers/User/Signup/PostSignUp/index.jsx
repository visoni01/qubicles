import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './style.scss'
import { userUpdateStart } from '../../../../redux-saga/redux/actions'
import AgentMultipartForm from './AgentMultipartForm'
import ContactCenterMultipartForm from './ContactCenterMultipartForm'

const RoleSetup = () => {
  const dispatch = useDispatch()
  const updateEmpployeeRoleCB = useCallback(() => {
    dispatch(userUpdateStart({ role: 'employer' }))
  }, [ dispatch ])

  const updateAgentRoleCB = useCallback(() => {
    dispatch(userUpdateStart({ role: 'agent' }))
  }, [ dispatch ])

  return (
    <div className='outer-panel'>
      <div className='outer-panel-inner'>
        <div className='process-title'>
          <h2 id='step-title-1' className='step-title is-active'>
            Welcome. How do you intend on using Qubicles?
          </h2>
        </div>
        <div id='signup-panel-1' className='process-panel-wrap is-active'>
          <div className='role-selector'>
            <div className='column is-4'>
              <div className='account-type'>
                <img src='https://i.imgur.com/EheuwMH.jpg' alt='Center logo' className='intro-logo' />
                <h3>For a Contact Center</h3>
                <p>
                  Operating inbound, outbound,  blended or multi-channel programs for a new or existing contact
                  center
                </p>
                <button
                  type='button'
                  className='button is-fullwidth is-rounded process-button'
                  data-step='step-dot-2'
                  onClick={ updateEmpployeeRoleCB }
                >
                  Continue
                </button>
              </div>
            </div>
            <div className='column is-4'>
              <div className='account-type'>
                <img src='https://i.imgur.com/83jbCrE.jpg' alt='Agent logo' className='intro-logo' />
                <h3>As an Agent or Manager</h3>
                <p>
                  Handle customer interactions, quality assurance, training or support for contact centers
                </p>
                <button
                  type='button'
                  className='button is-fullwidth is-rounded process-button'
                  data-step='step-dot-2'
                  onClick={ updateAgentRoleCB }
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const PostSignUp = () => {
  const userData = useSelector((state) => state.login)
  const userCode = userData && userData.userDetails && userData.userDetails.user_code

  return (
    <div className='signup-wrapper'>
      <div className='fake-nav'>
        <img className='qubicles-logo' src='https://i.imgur.com/Ap2GB30.png' width={ 180 } height={ 28 } alt='' />
      </div>
      {
        !(userCode) && <RoleSetup />
      }
      {
        userCode === 'agent'
        && <AgentMultipartForm role='agent' />
      }
      {
        userCode === 'employer'
        && <ContactCenterMultipartForm role='employer' />
      }
    </div>
  )
}

export default PostSignUp
