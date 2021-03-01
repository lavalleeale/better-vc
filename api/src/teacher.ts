import { Response, Request } from "express";
var express = require("express");
import { User } from "./entities/User";
import jwt from "jsonwebtoken";
import { Class } from "./entities/Class";

var router = express.Router();

router.post("/addTeacher", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    if (rawToken) {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        teacher: boolean;
      };
      if (token.teacher) {
        return res
          .status(200)
          .send(
            await User.update({ email: req.body.email }, { teacher: true })
          );
      }
    }
  }
  return res.status(401).send("no auth");
});
router.get("/getTeachers", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    if (rawToken) {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        teacher: boolean;
      };
      if (token.teacher) {
        return res
          .status(200)
          .send((await User.find({ teacher: true })).map((a) => a.name));
      }
    }
  }
  return res.status(401).send("no auth");
});
router.get("/getClasses", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    if (rawToken) {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        teacher: boolean;
      };
      if (token.teacher) {
        return res.status(200).send((await Class.find()).map((a) => a.name));
      }
    }
  }
  return res.status(401).send("no auth");
});
router.post("/addClass", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    if (rawToken) {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        teacher: boolean;
      };
      if (token.teacher) {
        return res.status(200).send(
          await Class.create({
            name: req.body.name,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            zoomLink: req.body.zoomLink,
            teacher: await User.findOne({ name: req.body.teacher }),
          }).save()
        );
      }
    }
  }
  return res.status(401).send("no auth");
});

export default router;
