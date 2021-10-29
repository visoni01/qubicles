import React from 'react'
import { TextField, Chip } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import PropTypes from 'prop-types'

export default function InviteManual({ setManualEmails, manualEmails }) {
  const {
    register, handleSubmit, errors, setValue,
  } = useForm({
    defaultValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('*Please enter a valid email').notOneOf(manualEmails, '*Already added that email'),
    }),
  })

  const onSubmit = (data) => {
    setManualEmails((current) => (
      [ ...current, data.email ]
    ))
    setValue('email', '')
  }

  return (
    <form className='is-fullwidth' onSubmit={ handleSubmit(onSubmit) }>
      <div className='mr-10'>
        <TextField
          name='email'
          className='is-fullwidth'
          autoComplete='off'
          placeholder='Type an email address and hit enter to add'
          inputRef={ register }
          error={ errors.email }
          helperText={ errors.email ? errors.email.message : '' }
          variant='outlined'
          size='small'
        />
        <div className='tags-set small'>
          {manualEmails && manualEmails.map((tag) => (
            <Chip
              size='small'
              key={ tag.id }
              onDelete={ () => {
                setManualEmails((current) => current.filter((currentEmail) => tag !== currentEmail))
              } }
              label={ tag }
              className='tag-chip'
            />
          ))}
        </div>
      </div>
    </form>
  )
}

InviteManual.propTypes = {
  manualEmails: PropTypes.arrayOf(PropTypes.string).isRequired,
  setManualEmails: PropTypes.func.isRequired,
}
