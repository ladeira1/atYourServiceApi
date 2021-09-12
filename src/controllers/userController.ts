import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { UserView } from "../views/userView";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        password,
        phone,
      } = req.body;
  
      const userRepository = getCustomRepository(UserRepository)
      const user = userRepository.create({
        name,
        email,
        phone,
      })
      user.hashPassword(password)
      
      await userRepository.save(user)
      res.status(201).json(UserView.returnUser(user))
    } catch (err) {
      res.status(401).json(UserView.error(err))
    }
  }
}

export { UserController }