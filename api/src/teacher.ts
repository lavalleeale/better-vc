import { Response, Request } from "express";
var express = require("express");
import { User } from "./entities/User";
import jwt from "jsonwebtoken";
import { Class } from "./entities/Class";
import { QueryFailedError } from "typeorm";
import { v2 as cloudinary } from "cloudinary";

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
router.get("/getAllClasses", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    if (rawToken) {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        teacher: boolean;
      };
      if (token.teacher) {
        return res.status(200).send(await Class.find());
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
            ...(req.body as Object),
            teacher: await User.findOne({
              where: { name: req.body.teacher },
            }),
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
          let teacher = await User.findOne({
            where: { name: req.body.block.teacher.name },
          });
          return res.status(200).send(
            await Class.save({
              ...req.body.block,
              teacher,
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
router.delete("/deleteClass", async (req: Request, res: Response) => {
  if (
    typeof req.headers.jwt === "string" &&
    typeof req.headers.name === "string"
  ) {
    const rawToken = req.headers.jwt as string;
    if (rawToken) {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        teacher: boolean;
      };
      if (token.teacher) {
        try {
          console.log(req.body);
          return res.status(200).send(Class.delete({ name: req.headers.name }));
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
router.delete("/deleteUser", async (req: Request, res: Response) => {
  if (
    typeof req.headers.jwt === "string" &&
    typeof req.headers.email === "string"
  ) {
    const rawToken = req.headers.jwt as string;
    if (rawToken) {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        teacher: boolean;
      };
      if (token.teacher) {
        try {
          return res
            .status(200)
            .send(User.delete({ email: req.headers.email }));
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
          let imageId;
          if (req.body.image) {
            imageId = (
              await cloudinary.uploader.upload(req.body.image, {
                format: "png",
                width: 100,
                height: 100,
                crop: "limit",
              })
            ).public_id;
          }
          const block = await User.create({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            nickname: req.body.nickname,
            teacher: req.body.teacher,
            image: cloudinary.url(imageId as string, { secure: true }),
            imageId: imageId,
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
router.get("/getClasses", async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === "string") {
    const rawToken = req.headers.jwt as string;
    try {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        email: string;
        teacher: boolean;
      };
      if (token.email && token.teacher) {
        return res.status(200).send(
          await Class.find({
            relations: ["teacher"],
            order: { startTime: "ASC" },
            where: { teacher: token.email },
          })
        );
      }
    } catch {}
  }
  return res.status(401).send("no auth");
});

export default router;
