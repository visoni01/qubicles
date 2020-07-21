import express from 'express'
import flowController from '../../../app/controllers/flow.controller'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'

const args = { mergeParams: true }
const flowRouter = express.Router(args)

// Section-3.8, REQ-2
flowRouter.route('/auth')
  .post(isAuthenticated, flowController.checkAuthorization)

// Section-3.8, REQ-3
flowRouter.route('/field/delete/:fieldId')
  .post(isAuthenticated, flowController.deleteFlowField)

// Section-3.8, REQ-4
flowRouter.route('/field/create')
  .post(isAuthenticated, flowController.saveFlowField)

// Section-3.8, REQ-5
flowRouter.route('/page/create')
  .post(isAuthenticated, flowController.addFlowPage)

// Section-3.8, REQ-6
flowRouter.route('/page/edit')
  .post(isAuthenticated, flowController.editFlowPage)

// Section-3.8, REQ-7
flowRouter.route('/page/delete/:pageId')
  .post(isAuthenticated, flowController.deleteFlowPage)

// Section-3.8, REQ-8
flowRouter.route('/list')
  .get(isAuthenticated, flowController.getFlows)

// Section-3.8, REQ-9
flowRouter.route('/email-templates')
  .get(isAuthenticated, flowController.getEmailTemplates)

// Section-3.8, REQ-10
flowRouter.route('/acd-queues')
  .get(isAuthenticated, flowController.getACDQueues)

// Section-3.8, REQ-11
flowRouter.route('/create')
  .post(isAuthenticated, flowController.addFlow)

// Section-3.8, REQ-12
flowRouter.route('/edit')
  .post(isAuthenticated, flowController.editFlow)

// Section-3.8, REQ-13
flowRouter.route('/copy')
  .post(isAuthenticated, flowController.copyFlow)

// Section-3.8, REQ-14
flowRouter.route('/delete/:flowId')
  .post(isAuthenticated, flowController.deleteFlow)

// Section-3.8, REQ-15
flowRouter.route('/user-id')
  .get(isAuthenticated, flowController.getCurrentUserId)

// Section-3.8, REQ-16
flowRouter.route('/pages/:flowId')
  .get(flowController.getFlowPagesByFlowId)

// Section-3.8, REQ-17
flowRouter.route('/fields/:flowId')
  .get(flowController.getFlowFieldsByFlowId)

// Section-3.8, REQ-18
flowRouter.route('/dispositions')
  .get(flowController.getDispositions)

// Section-3.8, REQ-19
flowRouter.route('/perform-action')
  .post(flowController.performAction)

// Section-3.8, REQ-20
flowRouter.route('/savelead')
  .post(flowController.saveLead)

// Section-3.8, REQ-21
flowRouter.route('/check-user-status')
  .get(flowController.checkUserStatus)

// Section-3.8, REQ-22
flowRouter.route('/dispo-householding-record')
  .post(flowController.dispoHouseholdingRecord)

// Section-3.8, REQ-23
flowRouter.route('/householding-records')
  .get(flowController.dispoHouseholdingRecord)

// Section-3.8, REQ-24
flowRouter.route('/lead')
  .get(flowController.getLead)

export { flowRouter }
