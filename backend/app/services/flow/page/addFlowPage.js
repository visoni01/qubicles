import ServiceBase from '../../../common/serviceBase'
import { FlowPage, Flow } from '../../../db/models'

const constraints = {
  flowId: {
    presence: { allowEmpty: false }
  },
  pageName: {
    presence: false
  },
  pageDescription: {
    presence: false
  }
}

export class AddFlowPageService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Check if flowId is valid or not
    const flowData = await Flow.findOne({ where: { flow_id: this.flowId }, raw: true })

    if (!(flowData && flowData['flow_id'])) {
      this.addError('InvalidField', 'Flow does not exist')
      return
    }

    // Check if flow_page for same pageName exist or not
    const flowPageDataData = await FlowPage.findOne({ where: { page_name: this.pageName }, raw: true })

    let flowPageData

    // Creating flowPage if pageName is not exist
    if (!(flowPageDataData && flowPageDataData['page_id'])) {
      flowPageData = {
        flow_id: this.flowId,
        page_name: this.pageName,
        page_description: this.pageDescription,
        randomize_pages_off: 'True'
      }
      await FlowPage.create(flowPageData)
    }
    return flowPageData
  }
}
