import { Response, Request } from "express";
var express = require("express");
import { User } from "./entities/User";
import jwt from "jsonwebtoken";

const __prod__ = process.env.NODE_ENV === "production";

var router = express.Router();

router.put("/updateNickname", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
      email: string;
      teacher: boolean;
    };
    if (token.email) {
      await User.update(
        { email: token.email },
        { nickname: req.body.nickname }
      );
      return res
        .status(204)
        .cookie(
          "auth",
          jwt.sign(
            {
              email: token.email,
              teacher: token.teacher,
              nickname: req.body.nickname,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1y",
            }
          ),
          {
            maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
            domain: __prod__ ? ".alextesting.ninja" : "localhost",
            secure: __prod__,
          }
        )
        .send();
    }
  }
  return res.status(401).send("no auth");
});
router.get("/getInfo", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    try {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        email: number;
      };
      if (token.email) {
        return res
          .status(200)
          .send(
            JSON.stringify(
              await User.findOne({ where: { email: token.email } })
            )
          );
      }
    } catch {}
  }
  return res.status(401).send("no auth");
});

export default router;
