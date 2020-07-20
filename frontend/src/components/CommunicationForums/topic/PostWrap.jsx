import React from 'react'
import PropTypes from 'prop-types'
import {
  faComment, faEye, faHeart,
} from '@fortawesome/free-solid-svg-icons'
import StatBlock from '../StatBlock'
import Post from './Post'
import { getTimeFromNow, isEmptyArray } from '../../../utils/common'
import { ownerDetails, dateWithUser, postShape } from '../forumValidators'

const PostWrap = ({
  createdAt, totalReplies, totalLikes, totalViews, posts,
}) => {
  const isPosts = !isEmptyArray(posts)
  const lastReply = isPosts && posts.slice(-1)[ 0 ].postMeta
  return (
    <div className='forum-wrap'>
      <div className='forum-container'>
        {/* Topic stats */}
        <div className='topic-stats'>
          {/* Created */}
          <StatBlock
            title='Created'
            data={ `${ getTimeFromNow(createdAt.date) }` }
            user={ createdAt.ownerDetails }
            type='user'
          />
          {/* Last Reply */}
          {isPosts && (
          <StatBlock
            title='Last Reply'
            data={ `${ getTimeFromNow(lastReply.createdAt) }` }
            user={ lastReply.ownerDetails }
            type='user'
          />
          )}
          {/* Replies */}
          <StatBlock title='Replies' data={ `${ totalReplies }` } icon={ faComment } type='icon' />
          {/* Views */}
          <StatBlock title='Views' data={ `${ totalViews }` } icon={ faEye } type='icon' />
          {/* Likes */}
          <StatBlock title='Likes' data={ `${ totalLikes }` } icon={ faHeart } type='icon' />
          {/* Contributers */}
        </div>
        {/* Post list items */}
        {isPosts ? (
          <div className='full-topic'>
            { posts.map((post) => <Post { ...post } key={ post.postId } />)}
          </div>
        ) : (
          <div className='no-data-message'>
            No comments yet...
          </div>
        )}

      </div>
    </div>
  )
}

PostWrap.propTypes = {
  topicTitle: PropTypes.string.isRequired,
  createdAt: dateWithUser.isRequired,
  totalReplies: PropTypes.number.isRequired,
  totalLikes: PropTypes.number.isRequired,
  totalViews: PropTypes.number.isRequired,
  moderators: PropTypes.arrayOf(ownerDetails).isRequired,
  posts: PropTypes.arrayOf(postShape).isRequired,
}

export default PostWrap
