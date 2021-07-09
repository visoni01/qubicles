import React from 'react'
import { Box, Divider, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Introduction from '../../../../components/CommonModal/Introduction'
import { formatCount } from '../../../../utils/common'

const CompanyStats = ({
  clientId,
  companyImageSrc,
  companyRating,
  companyName,
  location,
  title,
  summary,
  registrationDate,
  hires,
  jobsPosted,
}) => (
  <>
    <Box className='custom-box contact-center-info-root'>
      <div className='mb-20'>
        <Button
          onClick={ () => window.history.back() }
          classes={ {
            root: 'MuiButtonBase-root button-primary-small',
            label: 'MuiButton-label button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
          Back
        </Button>
      </div>
      <Introduction
        key={ clientId }
        imageName={ companyName }
        rating={ companyRating }
        imageSrc={ companyImageSrc }
        name={ companyName }
        location={ location }
        date={ registrationDate }
      />
      <h4 className='h4 margin-top-bottom-10'>
        {title}
      </h4>
      <p className='para'>
        {summary}
      </p>
      <Divider className='divider' />
      <div className='display-inline-flex justify-between is-fullwidth'>
        <div>
          <h4 className='h4'> 2K+ </h4>
          <p className='para'> Members</p>
          <h4 className='h4 mt-20'>
            { formatCount(hires) }
          </h4>
          <p className='para'> Hires </p>
        </div>
        <div>
          <h4 className='h4'> 2M+ </h4>
          <p className='para'> Total Calls </p>
          <h4 className='h4 mt-20'>
            { formatCount(jobsPosted) }
          </h4>
          <p className='para'> Jobs Posted </p>
        </div>
      </div>
    </Box>
  </>
)

CompanyStats.defaultProps = {
  companyRating: 3,
  hires: 0,
  jobsPosted: 0,
}
CompanyStats.propTypes = {
  clientId: PropTypes.number.isRequired,
  companyRating: PropTypes.number,
  companyDetails: PropTypes.shape({}).isRequired,
  companyImageSrc: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  registrationDate: PropTypes.string.isRequired,
  hires: PropTypes.number,
  jobsPosted: PropTypes.number,
}

export default CompanyStats
