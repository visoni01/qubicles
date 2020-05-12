import express from 'express'
import { exampleRouter } from './example.router'
import { userAgentRouter } from './userAgent.router'

const router = express.Router()
const NAMESPACE = 'v1'

// Example API
router.use(`/${NAMESPACE}`, exampleRouter)
router.use(`/${NAMESPACE}/agent`, userAgentRouter)

export default router
