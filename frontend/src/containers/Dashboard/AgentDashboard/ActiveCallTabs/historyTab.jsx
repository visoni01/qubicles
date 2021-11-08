import React from 'react'
import { Avatar } from '@material-ui/core'
import { outboundCallIcon, mailIcon } from '../../../../assets/images/agentDashboard'
import { carolin } from '../../../../assets/images/avatar'

const HistoryTab = () => {
  const dummyHistory = [
    {
      id: 0,
      type: 'outboundCall',
      description: 'Not at home',
      hasNotes: true,
      notes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      hasDuration: true,
      duration: '0:25 min',
    },
    {
      id: 1,
      type: 'outboundCall',
      description: 'Not at home',
      hasNotes: false,
      notes: '',
      hasDuration: true,
      duration: '0:22 min',
    },
    {
      id: 2,
      type: 'mail',
      description: 'Case forwarded',
      hasNotes: true,
      notes: `Lorem ipsum ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      sunt in culpa qui`,
      hasDuration: true,
      duration: '',
    },

  ]
  return (
    <div>
      {dummyHistory.map((historyItem) => (
        <div
          key={ historyItem.id }
          className='pt-10 display-inline-flex align-items-start is-fullwidth list-divider no-margin'
        >
          <div className='mt-20'>
            {historyItem.type === 'outboundCall' && <img src={ outboundCallIcon } alt='Outbound Call' />}
            {historyItem.type === 'mail' && <img src={ mailIcon } alt='Mail' />}
          </div>
          <div className='padding-10 pl-20 mb-5 is-fullwidth'>
            <div className='display-inline-flex is-fullwidth justify-between'>
              <div className='display-inline-flex'>
                <h4 className='h4'>
                  {historyItem.type === 'outboundCall' && 'Outbound Call:'}
                  {historyItem.type === 'mail' && 'Mail:'}
                </h4>
                <h4 className='h4 light ml-5 '>
                  {historyItem.description}
                </h4>
              </div>
              <div>
                {historyItem.hasDuration && <h4 className='h4 light unbold'>{historyItem.duration}</h4>}
              </div>
            </div>
            <div className='display-inline-flex align-items-center'>
              <Avatar className='profile-pic small no-margin-left' alt='Terry' src={ carolin } />
              <p className='para light sz-sm'>
                1 day ago by Carolin Barnett
              </p>
            </div>
            {historyItem.hasNotes && (
            <div>
              <h4 className='h4 unbold'> Notes </h4>
              <p className='para light'>{historyItem.notes}</p>
            </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default HistoryTab
