import Responder from '../../server/expressResponder'
import {
  DeleteFlowFieldService,
  SaveFlowFieldService,
  AddFlowPageService,
  UpdateFlowPageService,
  DeleteFlowPageService,
  GetFlowsService,
  GetEmailTemplatesService
} from '../services/flow'

export default class FlowController {
  static async deleteFlowField (req, res) {
    const deleteFlowFieldResult = await DeleteFlowFieldService.execute(req.params)
    if (deleteFlowFieldResult.successful) {
      Responder.success(res, deleteFlowFieldResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', deleteFlowFieldResult.errors)
    }
  }

  static async saveFlowField (req, res) {
    const saveFlowFieldResult = await SaveFlowFieldService.execute(req.body)
    if (saveFlowFieldResult.successful) {
      Responder.success(res, saveFlowFieldResult.result)
    } else {
      res.boom.badRequest('Invitation Failed', saveFlowFieldResult.errors)
    }
  }

  static async addFlowPage (req, res) {
    const addFlowPageResult = await AddFlowPageService.execute(req.body)
    if (addFlowPageResult.successful) {
      Responder.success(res, addFlowPageResult.result)
    } else {
      res.boom.badRequest('Invitation Failed', addFlowPageResult.errors)
    }
  }

  static async updateFlowPage (req, res) {
    const updateFlowPageResult = await UpdateFlowPageService.execute(req.body)
    if (updateFlowPageResult.successful) {
      Responder.success(res, updateFlowPageResult.result)
    } else {
      res.boom.badRequest('Invitation Failed', updateFlowPageResult.errors)
    }
  }

  static async deleteFlowPage (req, res) {
    const deleteFlowPageResult = await DeleteFlowPageService.execute(req.params)
    if (deleteFlowPageResult.successful) {
      Responder.success(res, deleteFlowPageResult.result)
    } else {
      res.boom.badRequest('Invitation Failed', deleteFlowPageResult.errors)
    }
  }

  static async getFlows (req, res) {
    const getFlowsResult = await GetFlowsService.execute()
    if (getFlowsResult.successful) {
      Responder.success(res, getFlowsResult.result)
    } else {
      res.boom.badRequest('Invitation Failed', getFlowsResult.errors)
    }
  }

  static async getEmailTemplates (req, res) {
    const getEmailTemplatesResult = await GetEmailTemplatesService.execute({ user: req.body.user })
    if (getEmailTemplatesResult.successful) {
      Responder.success(res, getEmailTemplatesResult.result)
    } else {
      res.boom.badRequest('Invitation Failed', getEmailTemplatesResult.errors)
    }
  }
}
