import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import AddArticleModal from './AddArticleModal'

export default function SectionOptions() {
  return (
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
}
