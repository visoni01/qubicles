import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  faComment, faEye,
} from '@fortawesome/free-solid-svg-icons'
import StatBlock from '../StatBlock'
import Post from './Post'
import { getTimeFromNow } from '../../../utils/common'
import { ownerDetails, dateWithUser, postShape } from '../forumValidators'
import TopicLikeIcon from './TopicLikeIcon'

const PostWrap = ({
  createdAt, totalLikes, totalViews, posts, topicId, topicLiked,
}) => {
  const sortedPosts = posts.slice().sort((a, b) => new Date(b.postMeta.createdAt) - new Date(a.postMeta.createdAt))
  const isPosts = !_.isEmpty(sortedPosts)
  const lastReply = isPosts && sortedPosts[ 0 ].postMeta
  const totalReplies = sortedPosts.length
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
          <TopicLikeIcon topicId={ topicId } topicLiked={ topicLiked } totalLikes={ totalLikes } />
          {/* Contributers */}
        </div>
        {/* Post list items */}
        {isPosts ? (
          <div className='full-topic'>
            { sortedPosts.map((post) => <Post { ...post } key={ post.postId } />)}
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
  topicId: PropTypes.number.isRequired,
  topicLiked: PropTypes.bool.isRequired,
}

export default PostWrap
