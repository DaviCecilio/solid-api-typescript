import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor (
    private createUserUseCase: CreateUserUseCase
  ) { }
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    try {
      await this.createUserUseCase.execute({
        name, email, password
      })

      return res.status(201).send()
    } catch (error) {
      return res.status(404).json({
        message: error.message || 'Unexpected Error'
      })
    }
  }
}