import ServiceBase from '../../common/serviceBase'

const constraints = {
  id: {
    presence: { allowEmpty: false }
  }
}

export default class ExampleService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    return 'okay'
  }
}
