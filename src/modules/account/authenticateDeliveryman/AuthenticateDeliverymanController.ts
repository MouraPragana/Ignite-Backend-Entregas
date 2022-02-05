import { Request, Response } from "express";
import { AuthenticateDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const authenticateDeliverymanController =
      new AuthenticateDeliverymanUseCase();

    const { username, password } = request.body;

    const result = await authenticateDeliverymanController.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
