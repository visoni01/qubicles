import Responder from '../../server/expressResponder'
import {
  DeleteFlowFieldService,
  SaveFlowFieldService,
  AddFlowPageService,
  UpdateFlowPageService,
  DeleteFlowPageService,
  GetFlowsService,
  GetEmailTemplatesService,
  CheckAuthorizationService
} from '../services/flow'

export default class FlowController {
  static async checkAuthorization (req, res) {
    const CheckAuthorizationResult = await CheckAuthorizationService.execute({ userId: req.body.user_id })
    if (CheckAuthorizationResult.successful) {
      Responder.success(res, CheckAuthorizationResult.result)
    } else {
      res.boom.badRequest('User authorization check operation failed', CheckAuthorizationResult.errors)
    }
  }

  static async deleteFlowField (req, res) {
    const deleteFlowFieldResult = await DeleteFlowFieldService.execute(req.params)
    if (deleteFlowFieldResult.successful) {
      Responder.success(res, deleteFlowFieldResult.result)
    } else {
      res.boom.badRequest('Delete Flow field Operation failed', deleteFlowFieldResult.errors)
    }
  }

  static async saveFlowField (req, res) {
    const saveFlowFieldResult = await SaveFlowFieldService.execute(req.body)
    if (saveFlowFieldResult.successful) {
      Responder.success(res, saveFlowFieldResult.result)
    } else {
      res.boom.badRequest('Save Flow field Operation failed', saveFlowFieldResult.errors)
    }
  }

  static async addFlowPage (req, res) {
    const addFlowPageResult = await AddFlowPageService.execute(req.body)
    if (addFlowPageResult.successful) {
      Responder.success(res, addFlowPageResult.result)
    } else {
      res.boom.badRequest('Add Flow page Operation failed', addFlowPageResult.errors)
    }
  }

  static async updateFlowPage (req, res) {
    const updateFlowPageResult = await UpdateFlowPageService.execute(req.body)
    if (updateFlowPageResult.successful) {
      Responder.success(res, updateFlowPageResult.result)
    } else {
      res.boom.badRequest('Update Flow page Operation failed', updateFlowPageResult.errors)
    }
  }

  static async deleteFlowPage (req, res) {
    const deleteFlowPageResult = await DeleteFlowPageService.execute(req.params)
    if (deleteFlowPageResult.successful) {
      Responder.success(res, deleteFlowPageResult.result)
    } else {
      res.boom.badRequest('Delete Flow page Operation failed', deleteFlowPageResult.errors)
    }
  }

  static async getFlows (req, res) {
    const getFlowsResult = await GetFlowsService.execute()
    if (getFlowsResult.successful) {
      Responder.success(res, getFlowsResult.result)
    } else {
      res.boom.badRequest('Get Flows Operation failed', getFlowsResult.errors)
    }
  }

  static async getEmailTemplates (req, res) {
    const getEmailTemplatesResult = await GetEmailTemplatesService.execute({ user: req.body.user })
    if (getEmailTemplatesResult.successful) {
      Responder.success(res, getEmailTemplatesResult.result)
    } else {
      res.boom.badRequest('Get Email templates Operation failed', getEmailTemplatesResult.errors)
    }
  }
}
