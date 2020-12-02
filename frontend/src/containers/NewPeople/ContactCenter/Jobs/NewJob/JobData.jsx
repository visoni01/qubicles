import React, { useState, useCallback } from 'react'
import {
  Button, TextField,
} from '@material-ui/core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import SingleSelect from '../../../SingleSelect'
import MyUploadAdapter from '../../../../../utils/uploadImage'
import '../styles.scss'
import Loader from '../../../../../components/loaders/circularLoader'

const NewJobData = ({
  newJobData,
  setNewJobData,
  jobFields,
  setNewJobDataCB,
  isEdit,
}) => {
  const dispatch = useDispatch()
  const [ isImageUploading, setIsImageUploading ] = useState(false)

  const handleDescriptionData = useCallback((event, editor) => {
    // eslint-disable-next-line
    setNewJobData((jobData) => ({
      ...jobData,
      description: editor.getData(),
    }))
  }, [ setNewJobData ])

  return (
    <div className='custom-box new-job-root has-fullwidth'>
      <div className='mb-20'>
        <Button
          classes={ {
            root: 'MuiButtonBase-root button-primary-small',
            label: 'MuiButton-label button-primary-small-label',
          } }
          onClick={ () => window.history.back() }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
          Back
        </Button>
      </div>
      <h2 className='h2'>
        {!isEdit ? 'New Job Post' : 'Edit Job Post'}
      </h2>
      <div className='category-section mt-20'>
        <div className='is-halfwidth'>
          <h3 className='h3'> Category* </h3>
          <div className='mt-10'>
            <SingleSelect
              items={ jobFields.jobCategories.map((category) => ({
                id: category.value,
                title: category.name,
              })) }

              onChange={
                (changedValue) => {
                  setNewJobData((current) => ({
                    ...current,
                    categoryId: changedValue && changedValue.id,
                    categoryName: changedValue && changedValue.title,
                  }))
                }
              }
              label='Choose job category'
              value={ (newJobData.categoryId !== '' && newJobData.categoryId) ? {
                id: newJobData.categoryId,
                title: newJobData.categoryName,
              } : null }
            />
          </div>

          <h3 className='mt-30 h3'> Job Title* </h3>
          <div className='mt-10'>
            <SingleSelect
              items={ jobFields.jobTitles.map((jobTitle) => ({
                title: jobTitle.name,
              })) }

              onChange={
                (changedValue) => {
                  setNewJobData((current) => ({
                    ...current,
                    title: changedValue && changedValue.title,
                  }))
                }
              }
              label='Choose job title'
              value={ (newJobData.title !== '' && newJobData.title) ? {
                title: newJobData.title,
              } : null }
            />
          </div>
        </div>

        <div className='is-halfwidth'>
          <h3 className='h3'> Needed* </h3>
          <div className='display-inline-flex mt-10'>
            <TextField
              margin='dense'
              id='agentNumber'
              name='needed'
              type='number'
              className='agent-field'
              variant='outlined'
              placeholder='20'
              value={ newJobData.needed }
              onChange={ setNewJobDataCB }
              required
            />
            <h4 className='h4 agent-label'> Agents </h4>
          </div>
        </div>
      </div>

      <h3 className='mt-30 mb-10 h3'> Job Description* </h3>
      <CKEditor
        editor={ ClassicEditor }
        onChange={ handleDescriptionData }
        className='mt-10'
        name='description'
        data={ newJobData.description }
        onInit={ (editor) => {
          editor.setData(newJobData.description)
          // eslint-disable-next-line
          editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
            return new MyUploadAdapter(loader, setIsImageUploading, dispatch)
          }
        } }
      />
      <Loader
        displayLoaderManually={ isImageUploading }
        enableOverlay={ false }
        size={ 50 }
      />
    </div>
  )
}

NewJobData.defaultProps = {
  jobFields: { jobCategories: [ 'Accounting', 'Client Service', 'Customer Service' ] },
  isEdit: false,
  newJobData: {
    jobId: '',
    categoryId: '',
    categoryName: '',
    needed: 0,
    title: '',
    description: '',
    status: 'recruiting',
    jobType: 'contract',
    payAmount: 0,
    durationType: 'on-demand',
    durationMonths: 0,
    experienceType: 'entry',
    employmentType: 'freelancer',
    languages: 'english',
    jobSkillsData: {
      requiredSkills: [],
      bonusSkills: [ ],
    },
    jobCoursesData: {
      requiredCourses: [],
      bonusCourses: [ ],
    },
  },
}

NewJobData.propTypes = {
  newJobData: PropTypes.shape(PropTypes.any),
  setNewJobData: PropTypes.func.isRequired,
  jobFields: PropTypes.arrayOf(PropTypes.string),
  setNewJobDataCB: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
}

export default React.memo(NewJobData)
