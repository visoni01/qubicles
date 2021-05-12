import React, { useEffect, useState } from 'react'
import { LinearProgress } from '@material-ui/core'
import _ from 'lodash'
import './Test/styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import RenderTestQuestion from './Test/renderTestQuestion'
import { viewCourseRequestStart } from '../../../../../redux-saga/redux/people'
import { courseIdPropType, sectionIdPropType } from './propTypes'

const SectionTest = ({ courseId, sectionId }) => {
  const dispatch = useDispatch()
  const { course, isLoading } = useSelector((state) => state.viewCourse)
  const sectionIndex = _.findIndex(course.courseContent.sections, [ 'id', sectionId ])
  const [ questions, setQuestions ] = useState([])
  const [ answers, setAnswers ] = useState([])

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

  return (
    <div className='test-modal'>
      {!isLoading && questions && (
      <div className='mb-20'>
        <div>
          <span className='para bold sz-lg'>
            {`Questions answered ${ answers.length } of ${ questions && questions.length }: `}
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
    </div>
  )
}

SectionTest.propTypes = {
  courseId: courseIdPropType.isRequired,
  sectionId: sectionIdPropType.isRequired,
}

export default SectionTest
