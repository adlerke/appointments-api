import { Router, request } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, password, email });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const fileName = req.file.filename;
      const user_id = req.user.id;
      const userAvatarService = new UpdateUserAvatarService();

      const user = await userAvatarService.execute({
        user_id,
        fileName,
      });

      delete user.password

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
);

export default userRouter;
