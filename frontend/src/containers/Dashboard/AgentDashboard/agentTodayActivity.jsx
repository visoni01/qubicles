import React from 'react'
import { Box, Divider } from '@material-ui/core'

const AgentTodayActivity = () => {
  const agentAnnouncements = [
    {
      id: 0,
      date: '04 Sep',
      title: 'New schedule During Covid-19 Pandemic',
    },
    {
      id: 1,
      date: '04 Sep',
      title: 'Welcome Our New Director Changing The World',
    },
  ]
  return (
    <>
      <Box className='custom-box agent-today-activity'>
        <h2 className='h2'>Today's Activity</h2>
        <div className='mt-20'>
          <div className='login-info'>
            <h4 className='h4'>Logged in </h4>
            <span className='para light ml-5 bold'>(04:03:52)</span>
          </div>
          <p className='para light sz-sm'> 10:00 pm, Mon, Oct 19 2020 , GMT-07:00</p>
        </div>

        <div className='mt-20'>
          <h4 className='h4'>Local Time</h4>
          <p className='para light sz-sm'> 14:03 pm, Mon, Oct 19 2020 , GMT-07:00</p>
        </div>
        <div className='mb-10'>
          <Divider className='divider' />
        </div>
        <h4 className='h4 mt-20 mb-5'>Latest Announcements</h4>
        {agentAnnouncements.map((item) => (
          <div key={ item.id } className='display-inline-flex is-fullwidth list-divider no-margin pb-10 pt-10'>
            <p className='para mr-10'>
              <b>{ item.date }</b>
            </p>
            <p className='para text light'>
              { item.title }
            </p>
          </div>
        ))}
      </Box>
    </>
  )
}

export default AgentTodayActivity
