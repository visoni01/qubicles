import React from 'react'
import PropTypes from 'prop-types'
import DateTime from './dateTime'

const DateTimeQuestionWithResult = ({ isCorrect, userAnswer, answerText }) => (
  <>
    {userAnswer
      ? (
        <div className='display-inline-flex align-items-center ml-5'>
          <DateTime dateTime={ userAnswer } />
        </div>
      )
      : <p className='para light ml-5'> (empty) </p>}

    {!isCorrect && (
      <div className='display-inline-flex align-items-center reference-answer-text is-fullwidth mt-7'>
        <DateTime dateTime={ answerText } />
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
