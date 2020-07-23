import React from 'react'
import TrainingDescription from './training'
import { trainingData } from './data'

const TalentWrapper = () => (
  trainingData.map(({ title, users }) => (
    <div className='forum-container mt-10' key={ title }>
      {/* Heading */}
      <div className='channel-heading'>
        <h3>{ title }</h3>
      </div>
      {/* Jobs */}
      {users.map((user) => (
        <TrainingDescription
          { ...user }
          key={ `${ user.title }-${ user.description }` }
        />
      ))}
    </div>
  )))

export default TalentWrapper
