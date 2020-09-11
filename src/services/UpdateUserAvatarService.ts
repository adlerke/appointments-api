import { getRepository } from "typeorm";
import User from "../models/User";
import path from "path";
import uploadConfig from "../config/upload";
import fs from "fs";

interface Request {
  user_id: string;
  fileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, fileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error("Only authenticated users can change avatar");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.diectory, user.avatar);
      const checkFileExisits = await fs.promises.stat(userAvatarFilePath);

      if (checkFileExisits) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = fileName

    await userRepository.save(user)
    return user;
  }
}

export default UpdateUserAvatarService;
