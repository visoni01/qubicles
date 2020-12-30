import React, { useState, useCallback } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const CourseDescription = ({
  title,
  description,
  goals,
  outcomes,
}) => {
  const [ showFullDescription, setShowFullDescription ] = useState(false)
  let descriptionButtonName
  if (showFullDescription) {
    descriptionButtonName = 'Close Full Description'
  } else {
    descriptionButtonName = 'View Full Description'
  }

  const handleFullDescriptionCB = useCallback(
    // eslint-disable-next-line no-shadow
    () => setShowFullDescription((showFullDescription) => !showFullDescription), [],
  )

  return (
    <>
      <div className='custom-box cover-letter-root has-fullwidth'>
        <h3 className='h3'>
          {title}
        </h3>
        <h4 className='h4 mt-10 '> Description </h4>
        <p className='para  mb-10'>
          {description}
        </p>

        {showFullDescription && (
        <div>
          <h4 className='h4 mt-10 '> Goals </h4>
          <p className='para mb-10'>
            {goals}
          </p>
          <h4 className='h4 mt-10 '> Outcomes </h4>
          <p className='para mb-10'>
            {outcomes}
          </p>
          <h4 className='h4 mt-10 '> Prerequisites</h4>
          <p className='para'>
            <ol className='ml-15'>
              <li> One year experience working as call-center professional </li>
              <li>
                Completed following course
                <br />
                How to talk to clients?
              </li>
            </ol>
            {/* {prerequisites} */}
          </p>
        </div>
        )}
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label',
          } }
          onClick={ handleFullDescriptionCB }
        >
          { descriptionButtonName }
        </Button>
      </div>
    </>
  )
}

CourseDescription.defaultProps = {
  title: 'Title',
  description: 'description',
  goals: 'goals',
  outcomes: 'outcomes',
}

CourseDescription.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  goals: PropTypes.string,
  outcomes: PropTypes.string,
}

export default CourseDescription
