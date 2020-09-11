import { getRepository } from "typeorm";
import User from "../models/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '../config/auth'

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid email/password");
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new Error("Invalid email/password");
    }

    const  { secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
