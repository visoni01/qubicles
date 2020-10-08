import React from 'react'
import {
  Box, FormControlLabel, Grid, Radio, RadioGroup, TextareaAutosize, Button,
} from '@material-ui/core'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MyUploadAdapter from '../../utils/uploadImage'

const NewGroup = ({ changeStatus }) => (
  <Box className='box'>
    <form>
      <h2 className='h2 mb-30'>
        New Topic
      </h2>
      <div>
        <h3 className='h3'>Title</h3>
        <input
          className='primary-input-field mt-10 width-100-per'
          placeholder='Name of your topic'
        />
      </div>
      <div className='mt-10'>
        <h3 className='h3 mb-10'>
          Description
        </h3>
        <CKEditor
          editor={ ClassicEditor }
          onInit={ (editor) => {
            // eslint-disable-next-line
            editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
              return new MyUploadAdapter(loader)
            }
          } }
        />
      </div>
      <div className='mt-10'>
        <Button
          color='secondary'
          className='cancel-button'
          onClick={ changeStatus }
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          className='button-primary-small is-float-right'
          classes={ { label: 'primary-label' } }
        >
          Create
        </Button>
      </div>
    </form>
  </Box>
)

export default NewGroup
