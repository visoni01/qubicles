import React from 'react'
import {
  Avatar, Box, Divider,
} from '@material-ui/core'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { carolin } from '../../assets/images/avatar/index'

const Comments = () => {
  const { comments } = useSelector((state) => state.topicComments)

  return (
    <Box className='primary-box padding-20 comments-list'>
      <h3>
        Comments
      </h3>
      <div>
        {comments.length ? comments.map((comment, index) => (
          <>
            <div key={ comment.id } className='commentor-info'>
              <div className='display-inline-flex mb-10'>
                <Avatar className='mr-10' src={ carolin } />
                <div>
                  <p className='commentor-name'>
                    {comment.ownerName}
                  </p>
                  <p className='comment-date'>
                    {moment(comment.createdAt).format('MMMM DD YY hh:mm a')}
                  </p>
                </div>
              </div>
              <p className='comment-description'>
                {comment.comment}
              </p>
            </div>
            { (index + 1 < comments.length) && <Divider />}
          </>
        )) : (
          <h4 className='h4 text-align-center padding-20'>
            No comments to show
          </h4>
        )}
      </div>
    </Box>
  )
}

export default Comments
