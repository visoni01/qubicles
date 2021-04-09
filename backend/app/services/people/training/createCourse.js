import ServiceBase from '../../../common/serviceBase'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  course: {
    presence: { allowEmpty: false }
  }
}

export class PeopleAddNewCourseService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // const { course } = this.filteredArgs
    // WIP - course creation
    return 'okay'
  }
}
