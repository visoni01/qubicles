import ServiceBase from '../../../common/serviceBase'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  data: {
    presence: { allowEmpty: false }
  }
}

export class PeopleCreateJobApplicationService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    return 'okay'
  }
}
