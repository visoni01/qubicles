import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const TextQuestionWithResult = ({ isCorrect, answerText, userAnswer }) => (
  <>
    <p className={ `para answer-text ml-5 ${ userAnswer ? '' : 'light' }` }>
      {userAnswer || '(empty)'}
    </p>
    {isCorrect || <p className='para reference-answer-text mt-7'>{answerText}</p>}
  </>
)

TextQuestionWithResult.defaultProps = {
  answerText: '',
}

TextQuestionWithResult.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  answerText: PropTypes.string,
  userAnswer: PropTypes.string.isRequired,
}

export default TextQuestionWithResult
