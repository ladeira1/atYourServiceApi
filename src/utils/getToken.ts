import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

export const getToken = (id: string) => {
  return jwt.sign({ id }, authConfig.secret, {
    expiresIn: authConfig.expiresIn
  })
}