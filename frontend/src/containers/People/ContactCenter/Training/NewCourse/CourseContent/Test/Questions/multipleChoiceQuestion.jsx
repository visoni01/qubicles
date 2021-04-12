import React, { useCallback } from 'react'
import {
  Grid, TextField, IconButton, Button, RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDotCircle, faTrash, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const MultipleChoiceQuestion = ({
  questionDetails, setQuestionDetails,
}) => {
  const handleOptionValueChange = useCallback(({ optionId, newValue }) => {
    setQuestionDetails((current) => {
      const updatedOptions = current.options.map((option) => {
        if (option.id === optionId) {
          return {
            ...option,
            value: newValue,
          }
        }
        return option
      })
      return ({
        ...current,
        options: updatedOptions,
      })
    })
  }, [ setQuestionDetails ])

  const handleDeleteOptionButton = useCallback(({ optionId }) => {
    setQuestionDetails((current) => {
      const updatedOptions = current.options.filter((option) => option.id !== optionId)
      return ({
        ...current,
        options: updatedOptions,
        answerText: current.answerText === optionId ? 0 : current.answerText,
      })
    })
  }, [ setQuestionDetails ])

  const handleAddOptionButton = useCallback(() => {
    setQuestionDetails((current) => {
      const totalOptions = current.options.length
      if (totalOptions <= 5) {
        return ({
          ...current,
          options: [
            ...current.options,
            { id: totalOptions + 1, value: '' },
          ],
        })
      }
      return current
    })
  }, [ setQuestionDetails ])

  const selectCorrectOption = useCallback(({ optionId }) => {
    setQuestionDetails((current) => ({
      ...current,
      answerText: parseInt(optionId, 10),
    }))
  }, [ setQuestionDetails ])

  if (questionDetails.isSaved) {
    return (
      <div className='ml-20 pb-10'>
        {questionDetails.options.map((option) => (
          <div key={ option.id }>
            <div className='display-inline-flex align-items-center mt-5 mb-5'>
              <FontAwesomeIcon
                icon={ questionDetails.answerText === option.id ? faCheckCircle : faDotCircle }
                className='custom-fa-icon mr-10'
              />
              <p>{option.value}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Grid
      container
      spacing={ 3 }
      item
      xl={ 12 }
      lg={ 12 }
      md={ 12 }
      sm={ 12 }
      xs={ 12 }
      className='multiple-question'
    >
      <Grid item xl={ 9 } lg={ 9 } md={ 9 } sm={ 9 } xs={ 9 }>
        <p className='para bold'>Possible Answers</p>
        {questionDetails.options.map((option, index) => (
          <div className='is-fullwidth display-inline-flex align-items-center' key={ option.id }>
            <FontAwesomeIcon icon={ faDotCircle } className='custom-fa-icon mr-10' />
            <TextField
              className='is-fullwidth'
              margin='dense'
              variant='outlined'
              value={ option.value }
              onChange={ (e) => handleOptionValueChange({ optionId: option.id, newValue: e.target.value }) }
              placeholder={ `Option ${ index + 1 }` }
            />
            <div className='ml-20'>
              <IconButton
                onClick={ () => handleDeleteOptionButton({ optionId: option.id }) }
              >
                <FontAwesomeIcon
                  icon={ faTrash }
                  className='custom-fa-icon '
                />
              </IconButton>
            </div>
          </div>
        ))}

        {questionDetails.options.length < 5 && (
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label margin-10',
          } }
          onClick={ handleAddOptionButton }
        >
          Add option
        </Button>
        )}
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 } xs={ 3 }>
        <p className='para bold'>Right Answers</p>
        <RadioGroup
          className='radio-buttons'
          name='visibility'
          value={ questionDetails.answerText }
          onChange={ (e) => selectCorrectOption({ optionId: e.target.value }) }
        >
          {questionDetails.options.map((option) => (
            <div key={ option.id } className='answer-radio'>
              <FormControlLabel value={ option.id } control={ <Radio /> } />
            </div>
          ))}
        </RadioGroup>
      </Grid>
    </Grid>
  )
}

MultipleChoiceQuestion.propTypes = {
  questionDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    unitId: PropTypes.number.isRequired,
    questionType: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    answerText: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    isSaved: PropTypes.bool.isRequired,
  }).isRequired,
  setQuestionDetails: PropTypes.func.isRequired,
}

export default MultipleChoiceQuestion
