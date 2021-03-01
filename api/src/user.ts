import { Response, Request } from "express";
var express = require("express");
import { User } from "./entities/User";
import jwt from "jsonwebtoken";

var router = express.Router();

router.put("/updateNickname", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
      id: number;
    };
    if (token.id) {
      return res
        .status(200)
        .send(
          await User.update({ id: token.id }, { nickname: req.body.nickname })
        );
    }
  }
  return res.status(401).send("no auth");
});
router.get("/getInfo", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    try {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        id: number;
      };
      if (token.id) {
        return res
          .status(200)
          .send(
            JSON.stringify(await User.findOne({ where: { id: token.id } }))
          );
      }
    } catch {}
  }
  return res.status(401).send("no auth");
});

export default router;
