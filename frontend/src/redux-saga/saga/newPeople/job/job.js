import { takeEvery, put } from 'redux-saga/effects'
import {
  newJobDetailsFetchStart, newUpdateJobsFields, newJobDetailsFetchSuccessful,
} from '../../../redux/actions'
import { NEW_JOB_FIELDS } from '../../../redux/constants'
import { showErrorMessage } from '../../../redux/snackbar'
import People from '../../../service/people'

function* jobDetailsWatcher() {
  yield takeEvery([ newJobDetailsFetchStart.type, NEW_JOB_FIELDS ], jobDetailsWorker)
}

function* jobDetailsWorker(action) {
  try {
    switch (action.type) {
      case NEW_JOB_FIELDS: {
        const { data } = yield People.getJobCategoriesTitlesAndSkills()
        yield put(newUpdateJobsFields({ jobFields: data }))
        break
      }
      case newJobDetailsFetchStart.type: {
        const { jobId } = action.payload
        const { data } = yield People.getJobById(jobId)
        if (data) {
          const requiredCourses = []
          const bonusCourses = []
          const requiredSkills = []
          const bonusSkills = []
          data.jobCoursesData.map((course) => {
            if (course.course_preference === 'required') {
              requiredCourses.push({
                jobCourseId: course.job_course_id,
                coursePreference: course.course_preference,
                courseId: course.course_id,
              })
            } else {
              bonusCourses.push({
                jobCourseId: course.job_course_id,
                coursePreference: course.course_preference,
                courseId: course.course_id,
              })
            }
            return { requiredCourses, bonusCourses }
          })
          data.jobSkillsData.map((skill) => {
            if (skill.skill_preference === 'required') {
              requiredSkills.push({
                jobSkillId: skill.job_skill_id,
                skillPreference: skill.skill_preference,
                skillId: skill.skill_id,
                skillName: skill[ 'XQodSkill.skill_name' ],
              })
            } else {
              bonusSkills.push({
                jobSkillId: skill.job_skill_id,
                skillPreference: skill.skill_preference,
                skillId: skill.skill_id,
                skillName: skill[ 'XQodSkill.skill_name' ],
              })
            }
            return { requiredSkills, bonusSkills }
          })
          yield put(newJobDetailsFetchSuccessful({
            jobDetails: {
              jobId: data.jobDetails.job_id,
              categoryId: data.jobDetails.category_id,
              categoryName: data.jobDetails[ 'XQodCategory.category_name' ],
              jobPostOwnerId: data.jobDetails.user_id,
              clientId: data.jobDetails.client_id,
              title: data.jobDetails.title,
              description: data.jobDetails.description,
              jobType: data.jobDetails.job_type,
              employmentType: data.jobDetails.employment_type,
              durationType: data.jobDetails.duration_type,
              durationMonths: data.jobDetails.duration_months,
              experienceType: data.jobDetails.experience_type,
              locationType: data.jobDetails.location_type,
              payAmount: data.jobDetails.pay_amount,
              languages: data.jobDetails.languages,
              city: data.jobDetails.city,
              state: data.jobDetails.state,
              country: data.jobDetails.country,
              needed: data.jobDetails.needed,
              fulfilled: data.jobDetails.fulfilled,
              createdOn: data.jobDetails.created_on,
              jobCoursesData: {
                requiredCourses,
                bonusCourses,
              },
              jobSkillsData: {
                requiredSkills,
                bonusSkills,
              },
            },
          }))
        }
        break
      }
      default: return
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobDetailsWatcher
