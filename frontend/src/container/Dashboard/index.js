import React from 'react'
import SideBar from '../../components/Dashboard/sideBar'
import Announcement from '../../components/Dashboard/announcement'
import ActivityPosting from '../../components/Dashboard/activityPosting'
import Overview from '../../components/Dashboard/overview'
import profileLogo1 from '../../assets/images/ray.jpg'
import profileLogo2 from '../../assets/images/helen.jpg'
import demoPic from '../../assets/images/demo-pic.jpeg'

const Dashboard = () => (
  <div>
    <SideBar /> 
    <div id="dashboard-wrapper" className={'dashboard-outer'}>
      <div className={'dashboard-heading'}> Welcome to the Floor, Marlon </div>

      <div id="main-dashboard" className={'section-wrapper'}>
        <div id="basic-layout" className={'columns dashboard-columns'}>
          <div className={'column is-3'}>
            <div className={'feed-channels'}>
              <div className={'custom-header'}>
                Your Community rep 
              </div>
              <div className={'menu-items'}>
                <div className={'mb-4 font-size-custom'}> 285 People like your company </div>
                <div className={'font-size-custom'}> 111k People are following you company </div>
              </div>
            </div>

            {/* Announcement  */}

            <Announcement 
              announcements = {[
                {date: 'Jun 9, 2020', data: 'Certificate will be email to qualifying participants by Friday July, 2020'},
                {date: 'Oct 5, 2020', data: 'Certificate will be email to qualifying participants by Friday Oct, 2020' }
              ]}
            />

            {/* Posting  */}

            <ActivityPosting 
              title = {'Job posting'}
              data = {[
                {heading: 'Customer Specialist', subHeading: '16 applications receive'},
                {heading: 'Call center supervisors', subHeading: '71 applications receive'}
              ]}
            />

            <ActivityPosting 
              title = {'Active users'}
              data = {[
                {heading: 'Marlon Mars', subHeading: 'Offline'},
                {heading: 'Shivam Moneyheis', subHeading: 'Offline'}
              ]}
            />

          </div>
          <div className={'column is-5'}>
            <div className={'compose-card is-flex is-start is-vcenter'}>
              <figure className={'avatar image is-hidden-mobile'}>
                <img 
                  className={'img-circle'} 
                  src={profileLogo2} 
                  alt=""/>
              </figure>
              <div className={'status-wrapper'}>
                <textarea 
                  className={'textarea is-grow'} 
                  rows="5"
                  placeholder="Write something ..."></textarea>
              </div>
              <div className={'icon-button'}>
                  <i data-feather="upload-cloud"></i>
              </div>
            </div>
            <div className={'post-item animated preFadeInLeft fadeInLeft'}>
              <div className={'is-flex is-start is-vcenter padding-10'}>
                <img 
                  className={'feed-avatar'}  
                  src={profileLogo1} />
                <div className={'item-title full-width'}>
                  <span> Posted by </span> 
                  <a href="#" className={'ml-5'}>Ray O'Driscol</a> 
                  <span className={'feed-time-small float-right'}>45 minutes ago</span>
                  <br />
                </div>
              </div>
              <div className={'is-flex is-start is-vcenter'}>
                <p>
                  <span 
                    className={'post-title'}>
                    <a href="#">
                      How team building boosts productivity</a>
                  </span>
                  <br/>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem
                  Ipsum is simply
                  dummy text Lorem Ipsum ...
                </p>
              </div>
              <div className={'is-flex is-start is-vcenter'}>
                <div className={'feed-image-container'}>
                  <div className={'soft-overlay'}></div>
                  <img src={demoPic} />
                </div>
              </div>
            </div>
          </div>      
          <div className={'column is-4'}>
            <div className={'feed-card is-users'}>
              <h3 className={'card-heading'}>Active users</h3>
                <ul className={'user-list'}>
                  <li>
                    <div className={'user-list-avatar'}>
                      <img src={profileLogo2} />
                    </div>
                    <div className={'user-list-info'}>
                      <div className={'name'}>Terry Daniels</div>
                      <div className={'position'}>CEO</div>
                    </div>
                    <div className={'user-list-status is-online'}></div>
                  </li>
                  <li>
                    <div className={'user-list-avatar'}>
                      <img src={profileLogo2} />
                    </div>
                    <div className={'user-list-info'}>
                      <div className={'name'}>Marjory Cambell</div>
                      <div className={'position'}>CFO</div>
                    </div>
                    <div className={'user-list-status is-busy'}></div>
                  </li>
                  <li>
                    <div className={'user-list-avatar'}>
                      <img src={profileLogo2} />
                    </div>
                    <div className={'user-list-info'}>
                      <div className={'name'}>Kevin Smith</div>
                      <div className={'position'}>Software Engineer</div>
                    </div>
                    <div className={'user-list-status is-offline'}></div>
                  </li>
                  <li>
                    <div className={'user-list-avatar'}>
                      <img src={profileLogo2} />
                    </div>
                    <div className={'user-list-info'}>
                      <div className={'name'}>Melany Wright</div>
                      <div className={'position'}>Sales Manager</div>
                    </div>
                    <div className={'user-list-status is-online'}></div>
                  </li>
                  <li>
                    <div className={'user-list-avatar'}>
                    <img src={profileLogo2} />
                    </div>
                    <div className={'user-list-info'}>
                      <div className={'name'}>Helen Miller</div>
                      <div className={'position'}>Sales Manager</div>
                    </div>
                    <div className={'user-list-status is-online'}></div>
                  </li>
                </ul>
              </div>

              {/* Overview  */}

              <Overview
                title={'Customer service overview'}
                data={[
                  {number: '0.20', heading: 'Average speed of answer'},
                  {number: '2.45', heading: 'Marlon Mars'}
                ]}
              />

              <Overview
                title={'Staff productivity highlights'}
                data={[
                  {number: '76', heading: 'Calls per agent'},
                  {number: '2:45', heading: 'Average talk time'}
                ]}
              />
          </div>
        </div>
      </div>      
    </div>
  </div>
)

export default Dashboard