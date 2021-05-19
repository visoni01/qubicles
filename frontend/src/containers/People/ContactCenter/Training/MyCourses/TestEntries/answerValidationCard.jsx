import React from 'react'
import {
  Avatar, Button, Card, CardContent,
} from '@material-ui/core'
import './styles.scss'
import { terry } from '../../../../../../assets/images/avatar'

const AnswerValidationCard = () => (
  <Card variant='outlined' className='answer-validation-card-root'>
    <CardContent classes={ { root: 'card-content-root' } }>
      <div className='h4'>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
        + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?'}
      </div>
      <div className='display-inline-flex align-items-start is-fullwidth mt-10 mb-20'>
        <Avatar className='user-pic' alt={ terry } src={ terry } />
        <p className='para answer-text'>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore '
          + 'et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut '
          + 'aliquip ex ea commodo consequat.'}
        </p>
      </div>
      <div className='display-inline-flex is-fullwidth justify-end'>
        <Button
          className='validation-button'
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          Reference Answer
        </Button>
        <Button
          className='validation-button'
          classes={ {
            root: 'incorrect-button',
            label: 'button-primary-small-label',
          } }
        >
          Incorrect
        </Button>
        <Button
          className='validation-button'
          classes={ {
            root: 'correct-button',
            label: 'button-primary-small-label',
          } }
        >
          Correct
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default AnswerValidationCard
