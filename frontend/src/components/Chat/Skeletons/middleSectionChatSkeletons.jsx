import React from 'react'
import { Skeleton } from '@material-ui/lab'
import SelfMessageSkeleton from './selfMessageSkeleton'
import OtherUserMessageSkeleton from './otherUserMessageSkeleton'

const MiddleSectionChatSkeletons = () => (
  <div className='middle-section-chat-skeletons'>
    <Skeleton
      animation='wave'
      classes={ { root: 'date' } }
    />

    {[ ...Array(2).keys() ].map((val, index) => (
      <OtherUserMessageSkeleton
        key={ val }
        height={ index ? 'h-80' : 'h-60' }
      />
    ))}

    <Skeleton
      animation='wave'
      classes={ { root: 'notification' } }
    />

    {[ ...Array(2).keys() ].map((val, index) => (
      <SelfMessageSkeleton
        key={ val }
        height={ index ? 'h-60' : 'h-80' }
      />
    ))}

    <OtherUserMessageSkeleton height='h-80' />

    <SelfMessageSkeleton height='h-60' />
  </div>
)

export default MiddleSectionChatSkeletons
