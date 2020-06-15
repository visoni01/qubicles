import ServiceBase from '../../../common/serviceBase'
import { FlowPage } from '../../../db/models'

const constraints = {
  pageId: {
    presence: { allowEmpty: false }
  }
}

export class DeleteFlowPageService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Check if page_id is valid or not
    const flowPageData = await FlowPage.findOne({ where: { page_id: this.pageId }, raw: true })

    if (!(flowPageData && flowPageData['page_id'])) {
      this.addError('InvalidField', 'Flow page does not exist')
      return
    }

    // Delete page_id
    await FlowPage.destroy({ where: { page_id: this.pageId } })

    return flowPageData
  }
}
