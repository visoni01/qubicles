import React from 'react'
import NotificationCardSkeleton from './notificationCardSkeleton'
import './styles.scss'

const NotificationsSkeleton = () => (
  <>
    {[ ...Array(3).keys() ].map((val) => (
      <NotificationCardSkeleton
        key={ val }
      />
    ))}
  </>
)

export default NotificationsSkeleton
