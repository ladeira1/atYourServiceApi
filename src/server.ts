import express from 'express'
import './database'
import cors from 'cors'
import { authRoutes } from './modules/auth/routes'

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)

app.listen(3333, () => {
  console.log('Server running on port 3333')
})