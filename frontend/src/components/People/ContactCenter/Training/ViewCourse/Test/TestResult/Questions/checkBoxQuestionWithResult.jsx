import React from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { optionPropType, optionsPropType } from '../propTypes'
import './styles.scss'

const CheckBoxQuestionWithResult = ({
  options, correctOptions, userOptions, isCorrect,
}) => (
  <FormGroup className='checkboxes ml-5'>
    {options.map((option) => (
      <div key={ option.id }>
        <FormControlLabel
          disabled
          value={ option.value }
          label={ option.value }
          control={ (
            <Checkbox
              checked={ correctOptions.includes(option.id) || userOptions.includes(option.id) }
              className={ `
                ${ correctOptions.includes(option.id) ? 'correct-answer' : '' }
                ${ !isCorrect && _.difference(userOptions, correctOptions).includes(option.id) ? 'wrong-answer' : '' }
              ` }
            />
            ) }
        />
      </div>
    ))}
  </FormGroup>
)

CheckBoxQuestionWithResult.propTypes = {
  options: optionsPropType.isRequired,
  correctOptions: PropTypes.number.isRequired,
  userOptions: optionPropType.isRequired,
  isCorrect: PropTypes.bool.isRequired,
}

export default CheckBoxQuestionWithResult
