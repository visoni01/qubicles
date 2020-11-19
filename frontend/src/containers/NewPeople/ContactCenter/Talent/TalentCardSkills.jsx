import React, { useState } from 'react'
import { Button, Chip } from '@material-ui/core'
import PropTypes from 'prop-types'

export default function TalentCardSkills({ userSkills }) {
  const [ showAllTags, setShowAllTags ] = useState(false)
  const [ visibleSkillTags, setVisibleSkillTags ] = useState(userSkills.filter((skill, index) => index < 3))

  return (
    <div className='tags-set mt-10 mb-20'>
      {visibleSkillTags.map((skill) => <Chip key={ skill.skillId } label={ skill.skillName } className='tag-chip' />)}

      {!showAllTags && userSkills.length > 3 && (
      <Button
        className='more'
        onClick={ () => {
          setVisibleSkillTags(userSkills)
          setShowAllTags(true)
        } }
      >
        {`+${ userSkills.length - 3 } more`}
      </Button>
      )}
    </div>
  )
}

TalentCardSkills.defaultProps = {
  userSkills: [],
}

TalentCardSkills.propTypes = {
  userSkills: PropTypes.arrayOf(
    PropTypes.shape({
      skillId: PropTypes.number,
      skillName: PropTypes.string,
      endorsedCount: PropTypes.number,
    }),
  ),
}
