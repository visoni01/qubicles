import React from 'react'
import PropTypes from 'prop-types'
import DateTime from './dateTime'

const DateTimeQuestionWithResult = ({ isCorrect, userAnswer, answerText }) => (
  <>
    <div className='display-inline-flex align-items-center ml-5'>
      <DateTime dateTime={ answerText } />
    </div>

    {!isCorrect && (
      <div className='display-inline-flex align-items-center reference-answer-text is-fullwidth mt-7'>
        <DateTime dateTime={ userAnswer } />
      </div>
    )}
  </>
)

DateTimeQuestionWithResult.defaultProps = {
  answerText: '',
}

DateTimeQuestionWithResult.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  answerText: PropTypes.string,
  userAnswer: PropTypes.string.isRequired,
}

export default DateTimeQuestionWithResult
