import { compare } from "bcrypt";
import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive",
          equals: username,
        },
      },
    });

    if (!deliveryman) {
      throw new Error("Username or password invalid");
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid");
    }

    const token = sign({ deliveryman }, "dea9d29fadd1485fa69591f5712434ff", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}
