import { Response, Request } from "express";
var express = require("express");
import { User } from "./entities/User";
import jwt from "jsonwebtoken";
import { Class } from "./entities/Class";
import { QueryFailedError } from "typeorm";

var router = express.Router();

router.post("/promoteTeacher", async (req: Request, res: Response) => {
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
        return res.status(200).send(await User.find({ teacher: true }));
      }
    }
  }
  return res.status(401).send("no auth");
});
router.get("/getStudents", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    if (rawToken) {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        teacher: boolean;
      };
      if (token.teacher) {
        const students = await User.find({ teacher: false });
        return res.status(200).send(students);
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
        return res
          .status(200)
          .send(await Class.find({ relations: ["students"] }));
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
        try {
          const block = await Class.create({
            name: req.body.name,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            zoomLink: req.body.zoomLink,
            teacher: (await User.findOne({
              where: { name: req.body.teacher },
            }))!.name,
            students: (await Promise.all(
              req.body.students.map(
                async (student: { name: string }) =>
                  await User.findOne({ name: student.name })
              )
            )) as User[],
          }).save();
          return res.status(200).send(block);
        } catch (e) {
          if (e instanceof QueryFailedError) {
            return res.status(500).send("QueryFailedError");
          }
          return res.status(500).end();
        }
      }
    }
  }
  return res.status(401).send("not authed");
});
router.put("/updateClass", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    if (rawToken) {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        teacher: boolean;
      };
      if (token.teacher) {
        try {
          return res.status(200).send(
            await Class.save({
              ...req.body.block,
              teacher: await User.findOne({
                where: { name: req.body.block.teacher.name },
              }),
              students: (await Promise.all(
                req.body.block.students.map(
                  async (student: { name: string }) =>
                    await User.findOne({ name: student.name })
                )
              )) as User[],
            })
          );
        } catch (e) {
          if (e instanceof QueryFailedError) {
            return res.status(500).send("QueryFailedError");
          }
          return res.status(500).end();
        }
      }
    }
  }
  return res.status(401).send("not authed");
});
router.post("/addUser", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    if (rawToken) {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        teacher: boolean;
      };
      if (token.teacher) {
        if (!req.body.nickname) {
          req.body.nickname = req.body.name.split(" ")[0];
        }
        try {
          const block = await User.create({
            name: req.body.name,
            email: req.body.email,
            nickname: req.body.nickname,
            teacher: req.body.teacher,
          }).save();
          return res.status(200).send(block);
        } catch (e) {
          if (e instanceof QueryFailedError) {
            return res.status(500).send("QueryFailedError");
          }
          return res.status(500).end();
        }
      }
    }
  }
  return res.status(401).send("not authed");
});

export default router;
