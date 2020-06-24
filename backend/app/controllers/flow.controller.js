import Responder from '../../server/expressResponder'
import {
  DeleteFlowFieldService,
  SaveFlowFieldService,
  AddFlowPageService,
  EditFlowPageService,
  DeleteFlowPageService,
  GetFlowsService,
  GetEmailTemplatesService,
  CheckAuthorizationService,
  AddFlowService,
  EditFlowService,
  DeleteFlowService,
  GetACDQueueService,
  CopyFlowService,
  GetFlowPagesByFlowIdService,
  GetFlowFieldsByFlowIdService,
  GetDispositionsService,
  SaveLeadService
} from '../services/flow'
import config from '../../config/app'

export default class FlowController {
  static async checkAuthorization (req, res) {
    const appPath = config.get('flow.path')
    const CheckAuthorizationResult = await CheckAuthorizationService.execute({ userId: req.body.user_id, appPath })
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

  static async editFlowPage (req, res) {
    const editFlowPageResult = await EditFlowPageService.execute(req.body)
    if (editFlowPageResult.successful) {
      Responder.success(res, editFlowPageResult.result)
    } else {
      res.boom.badRequest('Edit Flow page Operation failed', editFlowPageResult.errors)
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

  static async addFlow (req, res) {
    const addFlowResult = await AddFlowService.execute(req.body)
    if (addFlowResult.successful) {
      Responder.success(res, addFlowResult.result)
    } else {
      res.boom.badRequest('Add Flow Operation failed', addFlowResult.errors)
    }
  }

  static async editFlow (req, res) {
    const editFlowResult = await EditFlowService.execute(req.body)
    if (editFlowResult.successful) {
      Responder.success(res, editFlowResult.result)
    } else {
      res.boom.badRequest('Edit Flow Operation failed', editFlowResult.errors)
    }
  }

  static async deleteFlow (req, res) {
    const deleteFlowResult = await DeleteFlowService.execute(req.params)
    if (deleteFlowResult.successful) {
      Responder.success(res, deleteFlowResult.result)
    } else {
      res.boom.badRequest('Delete Flow Operation failed', deleteFlowResult.errors)
    }
  }

  static async getACDQueues (req, res) {
    const acdQueueResult = await GetACDQueueService.execute(req.body)
    if (acdQueueResult.successful) {
      Responder.success(res, acdQueueResult.result)
    } else {
      res.boom.badRequest('Get ACD Queue Operation failed', acdQueueResult.errors)
    }
  }

  static async copyFlow (req, res) {
    const copyFlowResult = await CopyFlowService.execute(req.body)
    if (copyFlowResult.successful) {
      Responder.success(res, copyFlowResult.result)
    } else {
      res.boom.badRequest('Copy Flow Operation failed', copyFlowResult.errors)
    }
  }

  static async getCurrentUserId (req, res) {
    const user_id = req.body.user_id
    if (user_id) {
      Responder.success(res, { user_id })
    } else {
      res.boom.badRequest('Get Current User Id Operation failed')
    }
  }

  static async getFlowPagesByFlowId (req, res) {
    const getFlowPagesByFlowIdResult = await GetFlowPagesByFlowIdService.execute({ ...req.body, ...req.params })
    if (getFlowPagesByFlowIdResult.successful) {
      Responder.success(res, getFlowPagesByFlowIdResult.result)
    } else {
      res.boom.badRequest('Get Flow pages by Flow Id Operation failed', getFlowPagesByFlowIdResult.errors)
    }
  }

  static async getFlowFieldsByFlowId (req, res) {
    const getFlowFieldsByFlowIdResult = await GetFlowFieldsByFlowIdService.execute({
      ...req.params,
      userId: req.body.user_id
    })
    if (getFlowFieldsByFlowIdResult.successful) {
      Responder.success(res, getFlowFieldsByFlowIdResult.result)
    } else {
      res.boom.badRequest('Get Flow fields by Flow Id Operation failed', getFlowFieldsByFlowIdResult.errors)
    }
  }

  static async getDispositions (req, res) {
    const getDispositionsResult = await GetDispositionsService.execute(req.body)
    if (getDispositionsResult.successful) {
      Responder.success(res, getDispositionsResult.result)
    } else {
      res.boom.badRequest('Get Dispositions Operation failed', getDispositionsResult.errors)
    }
  }

  static async saveLead (req, res) {
    const saveLeadResult = await SaveLeadService.execute(req.body)
    if (saveLeadResult.successful) {
      Responder.success(res, saveLeadResult.result)
    } else {
      res.boom.badRequest('Save Lead Operation failed', saveLeadResult.errors)
    }
  }
}
