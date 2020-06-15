import ServiceBase from '../../common/serviceBase'
import { getAppsByUser } from '../apps/helper'

const constraints = {
  userId: {
    presence: { allowEmpty: false }
  }
}

export class CheckAuthorizationService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const apps = await getAppsByUser({ user_id: this.userId })
    const flowPath = '/Flow'

    const filteredApps = apps.find((app) => app.controllerpath.toLowerCase().includes(flowPath.toLowerCase()))
    if (!(filteredApps && filteredApps.length)) {
      this.addError('PermissionDenied', 'You don\'t have permission to access this page')
      return
    }

    return true
  }
}
