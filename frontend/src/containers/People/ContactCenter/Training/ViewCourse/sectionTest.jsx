/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import { Button, LinearProgress } from '@material-ui/core'
import _ from 'lodash'
import './Test/styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import RenderTestQuestion from './Test/renderTestQuestion'
import { viewCourseRequestStart } from '../../../../../redux-saga/redux/people'
import { courseIdPropType, sectionIdPropType } from './propTypes'
import TestCompleted from './Test/testCompleted'

const SectionTest = ({ courseId, sectionId }) => {
  const dispatch = useDispatch()
  const {
    course, isLoading, requestType, dataType,
  } = useSelector((state) => state.viewCourse)
  const sectionIndex = _.findIndex(course.courseContent.sections, [ 'id', sectionId ])
  const [ questions, setQuestions ] = useState([])
  const [ answers, setAnswers ] = useState([])
  const [ isTestCompleted, setIsTestCompleted ] = useState(false)

  useEffect(() => {
    dispatch(viewCourseRequestStart({
      courseId,
      sectionId,
      dataType: 'Section Test',
      requestType: 'FETCH',
    }))
  }, [ courseId, sectionId, dispatch ])

  useEffect(() => {
    setQuestions(course.courseContent.sections[ sectionIndex ].questions)
  }, [ course.courseContent.sections, sectionIndex ])

  const handleSubmit = useCallback(() => {
    dispatch(viewCourseRequestStart({
      courseId,
      sectionId,
      dataType: 'Section Test',
      requestType: 'UPDATE',
      questions: answers.map((answer) => ({
        id: answer.questionId,
        answer: answer.answer,
        questionType: answer.questionType,
      })),
    }))
  }, [ dispatch, answers, courseId, sectionId ])

  useEffect(() => {
    if (requestType === 'UPDATE' && dataType === 'Section Test' && !isLoading) {
      setIsTestCompleted(true)
    }
  }, [ dataType, requestType, isLoading ])

  return (
    <div className='test-modal'>
      {!isLoading && questions && !isTestCompleted && (
      <div className='mb-20'>
        <div>
          <span className='para bold sz-lg'>
            {`Questions answered ${ answers.length }/${ questions && questions.length }`}
          </span>
        </div>
        <div className='mt-10'>
          <LinearProgress
            variant='determinate'
            value={ `${ (answers.length * 100) / (questions && questions.length) }` }
            classes={ {
              root: 'progress-root',
              barColorPrimary: 'progress-bar-color',
              colorPrimary: 'progress-color',
            } }
          />
        </div>
      </div>
      )}
      {!isTestCompleted && (
      <div>
        {questions && questions.length && questions.map((question) => (
          <RenderTestQuestion
            key={ question.id }
            question={ question }
            answers={ answers }
            setAnswers={ setAnswers }
          />
        ))}
      </div>
      )}
      {isTestCompleted && (
      <TestCompleted
        totalAnswered={ answers.length }
        totalQuestions={ questions && questions.length }
      />
      )}
      <div className='is-flex is-center mt-40 mb-20'>
        <Button
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ handleSubmit }
          disabled={ !answers.length }
        >
          {!isTestCompleted ? 'Submit' : 'Go To Next Section'}
        </Button>
      </div>
    </div>
  )
}

SectionTest.propTypes = {
  courseId: courseIdPropType.isRequired,
  sectionId: sectionIdPropType.isRequired,
}

export default SectionTest
