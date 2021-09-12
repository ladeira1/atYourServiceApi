import { Router } from 'express'
import { UserController } from '../controllers/userController'
import { UserValidator } from '../validations/user'

const userValidator = new UserValidator()
const userController = new UserController()

const router = Router()
router.post('/create', userValidator.createAccount, userController.create)

export const userRoutes = router
