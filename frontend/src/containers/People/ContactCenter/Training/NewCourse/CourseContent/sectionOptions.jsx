import React from 'react'
import { Button } from '@material-ui/core'

const SectionOptions = () => (
  <div className='content-options display-inline-flex justify-between'>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
    >
      Add Unit
    </Button>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
    >
      Add Test
    </Button>
  </div>
)

export default SectionOptions
