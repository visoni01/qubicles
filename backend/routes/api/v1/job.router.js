import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'

const args = { mergeParams: true }
const jobRouter = express.Router(args)

jobRouter.route('/')
  .get(isAuthenticated, forumController.getCategories)
