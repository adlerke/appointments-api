import { Router } from "express";

import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionRouterr = Router();

sessionRouterr.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const authUser = new AuthenticateUserService();

    const { user,token } = await authUser.execute({
      email,
      password,
    });

    delete user.password

    return res.json({user,token});
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionRouterr;
