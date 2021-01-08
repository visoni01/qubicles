import React from 'react'
import { Box, Button, Divider } from '@material-ui/core'

const Invoices = () => (
  <div className='wallet-root mt-30'>
    <Box className='custom-box'>
      <h3 className='h3 mb-30'> Invoices </h3>
      <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
        <div>
          <p className='para bold text-link'> INV-832 </p>
          <p className='para'> 10-01-2020 - 10/31/2020 </p>
        </div>
        <div>
          <p className='para '> 734 QBE </p>
          <p className='para light'> $734 USD </p>
        </div>
      </div>
      <Divider className='divider' />
      <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
        <div>
          <p className='para bold text-link'> INV-833 </p>
          <p className='para'> 11-01-2020 - 11/31/2020 </p>
        </div>
        <div>
          <p className='para '> 811 QBE </p>
          <p className='para light'> $811 USD </p>
        </div>
      </div>
      <Divider className='divider' />
      <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
        <div>
          <p className='para bold text-link'> INV-834 </p>
          <p className='para'> 10-01-2020 - 10/31/2020 </p>
        </div>
        <div>
          <p className='para '> 734 QBE </p>
          <p className='para light'> $734 USD </p>
        </div>
      </div>
      <Divider className='divider' />
      <div className='text-center mb-10'>
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label',
          } }
        >
          View All Invoices
        </Button>
      </div>
    </Box>
  </div>
)

export default Invoices
