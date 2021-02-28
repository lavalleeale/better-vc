import { Response, Request } from "express";
var express = require("express");
import { User } from "./entities/User";
import jwt from "jsonwebtoken";

var router = express.Router();

router.post("/addTeacher", async (req: Request, res: Response) => {
  if (req.cookies.auth) {
    const token = jwt.verify(req.cookies.auth, process.env.JWT_SECRET) as {
      teacher: boolean;
    };
    if (token.teacher) {
      return res
        .status(200)
        .send(await User.update({ email: req.body.email }, { teacher: true }));
    }
  }
  return res.status(401).end();
});

export default router;
