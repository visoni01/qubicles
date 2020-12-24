import React from 'react'
import { Button, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'

export default function JobsCard({
  categoryTitle,
  job,
}) {
  return (
    <div className='right-section-open-position is-fullwidth'>
      <h4 className='h4'>
        {job.title }
      </h4>
      <p className='para light'>
        {categoryTitle }
      </p>
      <Button
        classes={ {
          root: 'button-primary-text view-job-post-button',
          label: 'button-primary-text-label',
        } }
      >
        View Job Post
      </Button>
      <Divider className='divider' />
    </div>
  )
}

JobsCard.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  job: PropTypes.shape({
    jobId: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
}
