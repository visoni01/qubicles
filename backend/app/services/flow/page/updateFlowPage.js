import ServiceBase from '../../../common/serviceBase'
import { FlowPage } from '../../../db/models'

const constraints = {
  pageId: {
    presence: { allowEmpty: false }
  },
  pageName: {
    presence: false
  },
  pageDescription: {
    presence: false
  },
  defaultDisposition: {
    presence: false
  },
  bgColor: {
    presence: false
  },
  defaultDispositionSDR: {
    presence: false
  },
  randomizePagesOff: {
    presence: false
  }
}

export class UpdateFlowPageService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Check if flowId is valid or not
    const flowPageData = await FlowPage.findOne({ where: { page_id: this.pageId }, raw: true })

    if (!(flowPageData && flowPageData['page_id'])) {
      this.addError('InvalidField', '\'page_id\' is not valid')
      return
    }

    const updatedFlowPageData = {
      page_name: this.pageName,
      page_description: this.pageDescription,
      default_disposition: this.defaultDisposition,
      page_bg_color: this.bgColor,
      default_disposition_sdr: this.defaultDispositionSDR,
      randomize_pages_off: this.randomizePagesOff
    }

    // Updaing the flow page data
    await FlowPage.update(updatedFlowPageData, { where: { page_id: this.pageId }, raw: true })

    return updatedFlowPageData
  }
}
