import { Response, Request } from "express";
var express = require("express");
import { User } from "./entities/User";
import jwt from "jsonwebtoken";

var router = express.Router();

router.put("/updateNickname", async (req: Request, res: Response) => {
  const rawToken = req.headers.jwt as string;
  const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
    name: string;
  };
  if (token.name) {
    return res
      .status(200)
      .send(
        await User.update({ name: token.name }, { nickname: req.body.nickname })
      );
  }
  return res.status(401).end();
});

export default router;
