import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { checkDisabledSaveQuestionButton } from '../helper'
import { testQuestionPropType } from '../../propTypes'

const TestQuestionOptions = ({
  handleDeleteQuestion, handleSaveQuestion, questionDetails,
}) => (
  <div className='display-inline-flex is-fullwidth justify-center'>
    <div className='margin-10'>
      <Button
        className='mr-20'
        classes={ {
          root: 'button-secondary-small-red',
          label: 'button-secondary-small-label',
        } }
        onClick={ handleDeleteQuestion }
      >
        Delete Question
      </Button>
    </div>
    <div className='margin-10'>
      <Button
        classes={ {
          root: 'button-secondary-small',
          label: 'button-secondary-small-label',
        } }
        onClick={ handleSaveQuestion }
        disabled={ checkDisabledSaveQuestionButton({ question: questionDetails }) }
      >
        Save Question
      </Button>
    </div>

  </div>
)

TestQuestionOptions.propTypes = {
  handleSaveQuestion: PropTypes.func.isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired,
  questionDetails: testQuestionPropType.isRequired,
}

export default TestQuestionOptions
