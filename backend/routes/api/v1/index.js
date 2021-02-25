import express from 'express'
import { exampleRouter } from './example.router'
import { userAgentRouter } from './userAgent.router'
import { userEmployerRouter } from './userEmployer.router'
import { authRouter } from './auth.router'
import { userRouter } from './user.router'
import { flowRouter } from './flow.router'
import { dashboardRouter } from './dashboard.router'
import { forumRouter } from './forum.router'
import { peopleRouter } from './people.router'
import { jobRouter } from './job.router'
import { companyProfileRouter } from './companyProfile.router'
import { agentJobRouter } from './agentJob.router'

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
router.use(`/${NAMESPACE}/jobs`, jobRouter)
router.use(`/${NAMESPACE}/agent/jobs`, agentJobRouter)
router.use(`/${NAMESPACE}/forum`, forumRouter)
router.use(`/${NAMESPACE}/people`, peopleRouter)
router.use(`/${NAMESPACE}/profile/company`, companyProfileRouter)

export default router
