import express from 'express'
import { exampleRouter } from './example.router'
import { userAgentRouter } from './userAgent.router'
import { userEmployerRouter } from './userEmployer.router'
import { authRouter } from './auth.router'
import { userRouter } from './user.router'
import { flowRouter } from './flow.router'
import { dashboardRouter } from './dashboard.router'

const router = express.Router()
const NAMESPACE = 'v1'

// Example API
router.use(`/${NAMESPACE}`, exampleRouter)
router.use(`/${NAMESPACE}/user`, userRouter)
router.use(`/${NAMESPACE}/agent`, userAgentRouter)
router.use(`/${NAMESPACE}/employer`, userEmployerRouter)
router.use(`/${NAMESPACE}/auth`, authRouter)
router.use(`/${NAMESPACE}/flows`, flowRouter)
router.use(`/${NAMESPACE}/dashboard`, dashboardRouter)

export default router
