import express from 'express'
import flowController from '../../../app/controllers/flow.controller'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'

const args = { mergeParams: true }
const flowRouter = express.Router(args)

flowRouter.route('/field/delete/:flowFieldId')
  .post(isAuthenticated, flowController.deleteFlowField)

flowRouter.route('/field/create')
  .post(isAuthenticated, flowController.saveFlowField)

flowRouter.route('/page/create')
  .post(isAuthenticated, flowController.addFlowPage)

flowRouter.route('/page/update')
  .post(isAuthenticated, flowController.updateFlowPage)

flowRouter.route('/page/delete/:pageId')
  .post(isAuthenticated, flowController.deleteFlowPage)

flowRouter.route('/')
  .get(isAuthenticated, flowController.getFlows)

flowRouter.route('/email-templates')
  .get(isAuthenticated, flowController.getEmailTemplates)

export { flowRouter }
