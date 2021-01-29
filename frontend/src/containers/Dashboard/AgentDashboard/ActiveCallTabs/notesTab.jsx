import React from 'react'
import { Avatar, TextareaAutosize } from '@material-ui/core'
import { carolin, terry } from '../../../../assets/images/avatar'
import './style.scss'

const NotesTab = () => {
  const dummyNotes = [
    {
      id: 0,
      noteText: `Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's`,
    },
    {
      id: 1,
      noteText: `Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took`,
    },
  ]
  return (
    <div className='display-inline-flex is-fullwidth'>
      <Avatar className='profile-pic no-margin-top no-margin-left' alt='Terry' src={ terry } />
      <div>
        <div className='is-fullwidth mb-20'>
          <div className='notes-box border-1'>
            <TextareaAutosize
              aria-label='minimum height'
              autoComplete='off'
              rowsMin={ 3 }
              placeholder='Add a note...'
              className='para pt-5'
            />
          </div>
        </div>
        <div className='mt-30'>
          {dummyNotes.map((note) => (
            <div key={ note.id } className='list-divider'>
              <p className='para'>
                {note.noteText}
              </p>
              <div className='display-inline-flex align-items-center mb-5'>
                <Avatar className='profile-pic small no-margin-left' alt='Terry' src={ carolin } />
                <p className='para light sz-sm'>
                  5 hours ago by Carolin Barnett
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotesTab
