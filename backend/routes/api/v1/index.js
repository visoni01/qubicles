import express from 'express'
import { exampleRouter } from './example.router'
import { userAgentRouter } from './userAgent.router'
import { authRouter } from './auth.router'

const router = express.Router()
const NAMESPACE = 'v1'

// Example API
router.use(`/${NAMESPACE}`, exampleRouter)
router.use(`/${NAMESPACE}/agent`, userAgentRouter)
router.use(`/${NAMESPACE}/auth`, authRouter)


export default router
