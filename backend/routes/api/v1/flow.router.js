import express from 'express'
import flowController from '../../../app/controllers/flow.controller'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'

const args = { mergeParams: true }
const flowRouter = express.Router(args)

// Section-3.8, REQ-2
flowRouter.route('/auth')
  .post(isAuthenticated, flowController.checkAuthorization)

// Section-3.8, REQ-3
flowRouter.route('/field/delete/:flowFieldId')
  .post(isAuthenticated, flowController.deleteFlowField)

// Section-3.8, REQ-4
flowRouter.route('/field/create')
  .post(isAuthenticated, flowController.saveFlowField)

// Section-3.8, REQ-5
flowRouter.route('/page/create')
  .post(isAuthenticated, flowController.addFlowPage)

// Section-3.8, REQ-6
flowRouter.route('/page/update')
  .post(isAuthenticated, flowController.updateFlowPage)

// Section-3.8, REQ-7
flowRouter.route('/page/delete/:pageId')
  .post(isAuthenticated, flowController.deleteFlowPage)

// Section-3.8, REQ-8
flowRouter.route('/')
  .get(isAuthenticated, flowController.getFlows)

// Section-3.8, REQ-9
flowRouter.route('/email-templates')
  .get(isAuthenticated, flowController.getEmailTemplates)

export { flowRouter }
