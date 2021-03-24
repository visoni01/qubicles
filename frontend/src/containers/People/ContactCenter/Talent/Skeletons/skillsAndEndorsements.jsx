import React from 'react'
import { Skeleton, AvatarGroup } from '@material-ui/lab'
import './styles.scss'

const SkillsAndEndorsementsSkeleton = () => (
  <div className='skill-endorsements-skeleton list-divider'>
    <Skeleton
      animation='wave'
      classes={ { root: 'title' } }
    />
    <div className='endorsement'>
      <AvatarGroup max={ 3 } spacing='small' className='avatar-group mr-15'>
        <Skeleton
          classes={ { root: 'avatar' } }
          animation='wave'
          variant='circle'
        />
        <Skeleton
          classes={ { root: 'avatar' } }
          animation='wave'
          variant='circle'
        />
        <Skeleton
          classes={ { root: 'avatar' } }
          animation='wave'
          variant='circle'
        />
        )
      </AvatarGroup>
      <Skeleton
        animation='wave'
        classes={ { root: 'title' } }
      />
    </div>
  </div>
)

export default SkillsAndEndorsementsSkeleton
