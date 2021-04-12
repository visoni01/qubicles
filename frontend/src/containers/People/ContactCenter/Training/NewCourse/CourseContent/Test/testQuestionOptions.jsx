import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { checkDisabledSaveQuestionButton } from '../helper'

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
  questionDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    unitId: PropTypes.number.isRequired,
    questionType: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    answerText: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    isSaved: PropTypes.bool.isRequired,
  }).isRequired,
}

export default TestQuestionOptions
