import { getRepository } from "typeorm";
import User from "../models/User";
import { hash } from 'bcryptjs'
interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const findUser = await userRepository.findOne({
      where: { email },
    });

    if (findUser) {
      throw new Error("This email is already being used");
    }

    const hashPassword = await hash(password,8) 

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });
    await userRepository.save(user)

    return user;
  }
}
export default CreateUserService;
