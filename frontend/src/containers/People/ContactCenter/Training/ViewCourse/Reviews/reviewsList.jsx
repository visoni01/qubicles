import React from 'react'
import { Divider } from '@material-ui/core'
import ViewCourseReview from './viewCourseReview'

const ReviewsList = () => (
  <div>
    <Divider className='divider' />
    {[ ...Array(6).keys() ].map((id) => (
      <ViewCourseReview
        key={ id }
        rating={ 3.5 }
        comment={ `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis risus mi. Ut placerat quam lectus.
          Curabitur dictum velit non lacus ornare tempor. Nullam quis augue in leo aliquet malesuada sit amet eget eros.
          Sed laoreet posuere velit sit amet varius.` }
        userName='Arthur Castille'
        userTitle='Customer Service Specialist'
        userPic='https://ipfs.telos.miami/ipfs/QmU5gDcgrQUdyaV5vTxLnxouu7SomBCSxHpBCWbRDwzRqj'
        dateOfReveiew='May 02 2021'
        courseProgress={ 50 }
      />
    ))}
  </div>
)

export default ReviewsList
