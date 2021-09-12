import { Router } from 'express'

const router = Router()
router.post('/create', () => console.log('a'))

export const authRoutes = router