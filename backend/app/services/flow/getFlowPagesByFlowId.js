import ServiceBase from '../../common/serviceBase'
import { Flow } from '../../db/models'
import { getUserById, getFlowPagesByFlowId, generateUUID, isAuthorizedForClient } from '../helper'
import GetClientsService from '../user/getClients'
import _ from 'lodash'

const constraints = {
  flowId: {
    presence: { allowEmpty: false }
  },
  userId: {
    presence: false
  }
}

export class GetFlowPagesByFlowIdService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const flow = await Flow.findOne({ where: { flow_id: this.flowId }, raw: true })

    if (!(flow && flow['flow_id'])) {
      this.addError('InvalidField', 'Flow does not exist')
      return
    }

    if (this.userId) {
      const currentUser = await getUserById({ user_id: this.userId })

      const { clients } = await GetClientsService.run({ user_id: this.userId })
      const isInvalid = !isAuthorizedForClient({
        clients,
        client_id: flow.client_id,
        user_level: currentUser.user_level
      })

      if (isInvalid) {
        this.addError('Unauthorized', 'Not authorized')
        return
      }
    }

    const allFlowPages = await getFlowPagesByFlowId({ flow_id: flow.flow_id })
    const sortPages = []

    let nonRandomizedPages = []
    let randomizedPages = []

    allFlowPages.forEach((flowPage) => {
      if (flowPage.randomize_pages_off == 'True' || flowPage.randomize_pages_off == '') {
        nonRandomizedPages.push(flowPage)
      } else if (flowPage.randomize_pages_off == 'False') {
        randomizedPages.push(flowPage)
      }
    })

    // always put non-randomized pages first, already sorted
    nonRandomizedPages = _.orderBy(nonRandomizedPages, 'page_id', 'ASC')

    if (nonRandomizedPages && nonRandomizedPages.length) {
      sortPages.push(nonRandomizedPages)
    }

    // only pull randomized pages if turned on the Flow level
    // generating random order
    // As mentioned in https://github.com/qubicles/manager/blob/master/FC2.Web/Controllers/FlowController.cs#L492
    randomizedPages = _.orderBy(randomizedPages, () => generateUUID())

    if (randomizedPages && randomizedPages.length) {
      sortPages.push(randomizedPages)
    }

    return sortPages
  }
}
