import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ msg: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "dea9d29fadd1485fa69591f5712434da"
    ) as Ipayload;

    request.id_client = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ msg: "Invalid Token" });
  }
}
