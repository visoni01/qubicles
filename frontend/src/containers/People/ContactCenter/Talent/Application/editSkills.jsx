/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
  Avatar, Button, FormControl, Divider,
  RadioGroup, FormControlLabel, Radio, Grid, Select,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '../styles.scss'
import { AvatarGroup } from '@material-ui/lab'
import _ from 'lodash'
import SingleSelect from '../../../../Shared/singleSelect'
import { agentResumeSkillsStart, fetchJobSkillsStart } from '../../../../../redux-saga/redux/people'
import { agentProfileSettingsApiStart } from '../../../../../redux-saga/redux/actions'
import Loader from '../../../../../components/loaders/circularLoader'

const EditSkills = ({
  open, handleClose, agentResumeSkills, languages: agentResumeLanguages, candidateId, isLoading,
}) => {
  const dispatch = useDispatch()
  const { jobSkills } = useSelector((state) => state.jobSkills)
  const [ skills, setSkills ] = useState(agentResumeSkills)
  const [ primaryLanguage, setPrimaryLanguage ] = useState(agentResumeLanguages[ 0 ])
  const [ otherLanguages, setOtherLanguages ] = useState(agentResumeLanguages.slice(1))
  const [ newLanguage, setNewLanguage ] = useState({ name: 'English', type: null })
  const [ newSkill, setNewSkill ] = useState(null)
  const [ addedSkills, setAddedSkills ] = useState(new Set())
  const [ removedSkills, setRemovedSkills ] = useState({})
  const availableLanguages = [
    'English', 'French', 'Spanish', 'Arabic', 'Bengali', 'Chinese', 'German',
    'Hindi', 'Indonesian', 'Japanese', 'Portuguese', 'Russian', 'Urdu',
  ]

  useEffect(() => {
    if (!jobSkills) {
      dispatch(fetchJobSkillsStart({}))
    }
  }, [ dispatch, jobSkills ])

  useEffect(() => {
    const skillIds = agentResumeSkills.map((item) => item.skillId)
    setAddedSkills(new Set(skillIds))
  }, [ agentResumeSkills ])

  const handleCancel = useCallback(() => {
    setSkills(agentResumeSkills)
    setPrimaryLanguage(agentResumeLanguages[ 0 ])
    setOtherLanguages(agentResumeLanguages.slice(1))
    handleClose()
  }, [ agentResumeSkills, agentResumeLanguages, handleClose ])

  const onSave = useCallback(() => {
    if (!_.isEqual(agentResumeSkills, skills)) {
      dispatch(agentResumeSkillsStart({
        requestType: 'UPDATE',
        candidateId,
        updatedDataType: 'Skills',
        updatedData: _.sortBy(skills, (skill) => skill.skillId).map((skill) => skill.skillId),
      }))
    }
    if (!_.isEqual(agentResumeLanguages, [ primaryLanguage, ...otherLanguages ])) {
      dispatch(agentProfileSettingsApiStart({
        requestType: 'UPDATE',
        updatedDataType: 'Languages',
        updatedData: {
          languages: [
            primaryLanguage,
            ..._.sortBy(otherLanguages, (language) => availableLanguages.indexOf(language)),
          ],
        },
      }))
    }
  }, [
    dispatch, skills, candidateId, availableLanguages,
    agentResumeLanguages, agentResumeSkills, primaryLanguage, otherLanguages,
  ])

  // Skill Handlers

  const addNewSkill = useCallback(() => {
    let newAddedSkill = { skillId: newSkill.id, skillName: newSkill.title, endorsedCount: 0 }
    if (removedSkills[ newSkill.id ]) {
      newAddedSkill = removedSkills[ newSkill.id ]
      setRemovedSkills((state) => ({
        ...state,
        [ newSkill.id ]: null,
      }))
    }
    setSkills((state) => ([
      ...state,
      newAddedSkill,
    ]))
    setAddedSkills((state) => state.add(newSkill.id))
    setNewSkill(null)
  }, [ newSkill, removedSkills ])

  const removeSkill = useCallback((removedSkill) => {
    setSkills((state) => (state.filter((skill) => skill.skillId !== removedSkill.skillId)))
    const tempSet = addedSkills
    tempSet.delete(removedSkill.skillId)
    setAddedSkills(tempSet)
    setRemovedSkills((state) => ({
      ...state,
      [ removedSkill.skillId ]: removedSkill,
    }))
  }, [ addedSkills ])

  // Language Handlers

  const handlePrimaryLanguageChange = useCallback(() => {
    setOtherLanguages((state) => ([
      primaryLanguage,
      ...state,
    ]))
    setPrimaryLanguage('')
  }, [ primaryLanguage ])

  const removePrimaryLanguage = useCallback(() => {
    setPrimaryLanguage('')
  }, [])

  const handleOtherLanguageChange = useCallback((value, index) => {
    setPrimaryLanguage(value)
    setOtherLanguages((state) => ([
      ...state.slice(0, index),
      ...state.slice(index + 1),
    ]))
  }, [])

  const removeOtherLanguage = useCallback((index) => {
    setOtherLanguages((state) => ([
      ...state.slice(0, index),
      ...state.slice(index + 1),
    ]))
  }, [])

  const handleNewLanguageChange = useCallback((value) => {
    setNewLanguage((state) => ({
      ...state,
      ...value,
    }))
  }, [])

  const addNewLanguage = useCallback(() => {
    if (newLanguage.type === 'primary') {
      setPrimaryLanguage(newLanguage.name)
    } else {
      setOtherLanguages((state) => ([
        ...state,
        newLanguage.name,
      ]))
    }
    setNewLanguage({ name: 'English', type: null })
  }, [ newLanguage ])

  const languageExists = useCallback(() => (
    (primaryLanguage === newLanguage.name) || otherLanguages.includes(newLanguage.name)
  ), [ newLanguage, otherLanguages, primaryLanguage ])

  return (
    <Dialog
      scroll='body'
      open={ open }
      onClose={ handleCancel }
      maxWidth='sm'
      fullWidth
      className='custom-modal edit-skills-modal'
    >
      <div className='header'>
        {/* Skills */}
        <DialogTitle>
          <div className='display-inline-flex align-items-center'>
            <div className='h2'>Skills</div>
            {isLoading && (
            <Loader
              className='static-small-loader'
              enableOverlay={ false }
              displayLoaderManually
              size={ 25 }
            />
            )}
          </div>
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ handleCancel }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <div className='mb-25'>
          {skills && skills.map((agentSkill) => (
            <div key={ agentSkill.skillId } className='mt-20 mb-20 list-divider'>
              <div className='display-inline-flex justify-between is-fullwidth align-items-center'>
                <h4 className='h4 mb-10'>{agentSkill.skillName}</h4>
                <Button
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                  onClick={ () => removeSkill(agentSkill) }
                >
                  Remove
                </Button>
              </div>
              <div className='display-inline-flex mb-10'>
                {agentSkill.endorsedCount > 0 && (
                  <AvatarGroup max={ 3 } spacing='small' className='avatar-group'>
                    { agentSkill.endorsements && agentSkill.endorsements.map((endorsement, index) => {
                      if (index < 3) {
                        return (
                          <Avatar
                            key={ endorsement.id }
                            alt={ endorsement.userProfile.name }
                            src={ endorsement.userProfile.profilePic }
                          />
                        )
                      } return null
                    })}
                  </AvatarGroup>
                )}
                {agentResumeSkills.includes(agentSkill) ? (
                  <p className='para light margin-auto ml-5'>
                    {agentSkill.endorsedCount}
                    {' '}
                    {agentSkill.endorsedCount !== 1 ? 'people have ' : 'person has ' }
                    given
                    {agentSkill.endorsedCount !== 1 ? ' endorsements ' : ' endorsement ' }
                    for this skill
                  </p>
                ) : (
                  <p className='para light margin-auto ml-5'>
                    Recently added this skill
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <h3 className='h3'>
          Add Skill
        </h3>
        <div className='display-inline-flex is-fullwidth justify-between align-items-center mb-30'>
          <FormControl variant='outlined' className='drop-down-bar'>
            <SingleSelect
              // items={ fillSkills().map((item) => ({ id: item.skillId, title: item.skillName })) }
              items={ jobSkills && jobSkills.filter((item) => (!addedSkills.has(item.skillId)))
                .map((item) => ({ id: item.skillId, title: item.skillName })) }
              onChange={ (selectedValue) => setNewSkill(selectedValue) }
              value={ newSkill }
              label='Choose Skill'
            />
          </FormControl>
          <div className='ml-20'>
            <Button
              classes={ {
                root: 'button-primary-small is-fullheight',
                label: 'button-primary-small-label',
              } }
              onClick={ addNewSkill }
              disabled={ !newSkill }
            >
              Add
            </Button>
          </div>
        </div>
        <Divider />
        {/* Languages */}
      </DialogContent>
      <div className='header'>
        <DialogTitle>
          <div className='h2'>Languages</div>
          <p className='para error-message'>
            { !primaryLanguage ? '*Exactly one primary language must be selected' : '' }
          </p>
        </DialogTitle>
      </div>
      <DialogContent>
        <div className='mb-25'>
          {/* Primary Language */}
          {primaryLanguage && (
          <Grid
            container
            justify='space-between'
            alignItems='center'
            className='mt-20'
            spacing={ 1 }
          >
            <Grid item sm={ 1 } xs={ 1 }>
              <h4 className='h4'>
                1.
              </h4>
            </Grid>
            <Grid item sm={ 3 } xs={ 3 }>
              <h4 className='h4'>
                {' '}
                { primaryLanguage }
                {' '}
              </h4>
            </Grid>
            <Grid item sm={ 6 } xs={ 6 }>
              <RadioGroup
                className='radio-buttons ml-30'
                defaultValue='primary'
                onChange={ handlePrimaryLanguageChange }
              >
                <div className='display-inline-flex'>
                  <FormControlLabel
                    value='primary'
                    control={ <Radio /> }
                    label='Primary'
                  />
                  <FormControlLabel
                    value='other'
                    control={ <Radio /> }
                    label='Other'
                  />
                </div>
              </RadioGroup>
            </Grid>
            <Grid item sm={ 2 } xs={ 2 }>
              <Button
                classes={ {
                  root: 'button-primary-text',
                  label: 'button-primary-text-label',
                } }
                onClick={ removePrimaryLanguage }
              >
                Remove
              </Button>
            </Grid>
          </Grid>
          )}
          {/* Other Languages */}
          {otherLanguages && otherLanguages.map((language, index) => (
            <Grid
              key={ language.name }
              container
              justify='space-between'
              alignItems='center'
              className='mt-20'
              spacing={ 1 }
            >
              <Grid item sm={ 1 } xs={ 1 }>
                <h4 className='h4'>
                  {' '}
                  {index + 1 + !!primaryLanguage}
                  {'.'}
                </h4>
              </Grid>
              <Grid item sm={ 3 } xs={ 3 }>
                <h4 className='h4'>
                  {' '}
                  {language}
                  {' '}
                </h4>
              </Grid>
              <Grid item sm={ 6 } xs={ 6 }>
                <RadioGroup
                  className='radio-buttons ml-30'
                  value='other'
                  onChange={ () => handleOtherLanguageChange(language, index) }
                >
                  <div className='display-inline-flex'>
                    <FormControlLabel
                      value='primary'
                      control={ <Radio /> }
                      label='Primary'
                      disabled={ !!primaryLanguage }
                    />
                    <FormControlLabel
                      value='other'
                      control={ <Radio /> }
                      label='Other'
                    />
                  </div>
                </RadioGroup>
              </Grid>
              <Grid item sm={ 2 } xs={ 2 }>
                <Button
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                  onClick={ () => removeOtherLanguage(index) }
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
          {/* Add New Language */}
          <Grid
            container
            justify='space-between'
            alignItems='center'
            className='mt-10'
            spacing={ 1 }
          >
            <Grid item sm={ 1 } xs={ 1 }>
              <h4 className='h4'>
                {' '}
                {otherLanguages.length + 1 + !!primaryLanguage}
                {'.'}
              </h4>
            </Grid>
            <Grid item sm={ 3 } xs={ 11 }>
              <Select
                className='is-fullwidth'
                native
                margin='dense'
                variant='outlined'
                value={ newLanguage.name }
                onChange={ (e) => handleNewLanguageChange({ name: e.target.value }) }
              >
                {availableLanguages.map((language) => (
                  <option key={ language } value={ language } className='para sz-xl'>
                    {language}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item sm={ 6 } xs={ 6 }>
              <RadioGroup
                className='radio-buttons ml-30'
                onChange={ (e) => handleNewLanguageChange({ type: e.target.value }) }
                value={ newLanguage.type }
              >
                <div className='display-inline-flex'>
                  <FormControlLabel
                    value='primary'
                    control={ <Radio /> }
                    label='Primary'
                    disabled={ !!primaryLanguage }
                  />
                  <FormControlLabel
                    value='other'
                    control={ <Radio /> }
                    label='Other'
                  />
                </div>
              </RadioGroup>
            </Grid>
            <Grid item sm={ 2 } xs={ 4 }>
              <Button
                classes={ {
                  root: 'button-primary-small is-fullheight',
                  label: 'button-primary-small-label',
                } }
                disabled={ !newLanguage.name || !newLanguage.type || languageExists() }
                onClick={ addNewLanguage }
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions className='modal-actions'>
        <Button
          classes={ {
            root: 'button-secondary-small-red',
            label: 'button-secondary-small-label',
          } }
          onClick={ handleCancel }
        >
          Cancel
        </Button>
        <Button
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          disabled={
            (_.isEqual(agentResumeSkills, skills)
            && _.isEqual(agentResumeLanguages, [ primaryLanguage, ...otherLanguages ]))
            || !primaryLanguage || isLoading
          }
          onClick={ onSave }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EditSkills.defaultProps = {
  agentResumeSkills: [],
  languages: [],
  isLoading: false,
}

EditSkills.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  agentResumeSkills: PropTypes.arrayOf(PropTypes.shape({
    skillId: PropTypes.number.isRequired,
    skillName: PropTypes.string.isRequired,
    endorsedCount: PropTypes.number.isRequired,
  })),
  languages: PropTypes.arrayOf(PropTypes.string),
  candidateId: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
}

export default EditSkills
