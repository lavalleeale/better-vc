import "reflect-metadata";
const express = require("express");
import { Response } from "express";
import { join } from "path";
import { createConnection } from "typeorm";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import cors from "cors";
import jwt from "jsonwebtoken";
import teacher from "./teacher";
import student from "./student";
import { User } from "./entities/User";
import cookieParser from "cookie-parser";

const __prod__ = process.env.NODE_ENV === "production";
require("dotenv-safe").config();

async function main() {
  await createConnection({
    type: "postgres",
    database: process.env.DATEBASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    entities: [join(__dirname, "./entities/*.*")],
    logging: !__prod__,
    synchronize: !__prod__,
  });
  const app = express();
  passport.serializeUser(function (user: any, done) {
    done(null, user.accessToken);
  });
  app.use(cors({ origin: `${process.env.FRONTEND_URL}` }));
  app.use(passport.initialize());
  app.use(express.json());
  app.use(cookieParser());
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL}/auth/google/callback`,
      },
      async (_accessToken, _refreshToken, profile, cb) => {
        let user = await User.findOne({ where: { userId: profile.id } });
        if (user) {
          user.name = profile.displayName;
          await user.save();
        } else {
          user = await User.create({
            name: profile.displayName,
            userId: profile.id,
            email: profile.emails![0].value,
            teacher: false,
          }).save();
        }
        cb(undefined, {
          accessToken: jwt.sign(
            {
              userId: user.id,
              name: user.name,
              teacher: user.teacher,
              nickname: user.nickname,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1y",
            }
          ),
        });
      }
    )
  );
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      session: false,
      scope: ["email", "profile"],
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    function (req: any, res: Response) {
      res
        .cookie("auth", req.user.accessToken, {
          maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
          domain: ".alextesting.ninja",
        })
        .redirect(`${process.env.FRONTEND_URL}`);
    }
  );
  app.use("/teacher", teacher);
  app.use("/student", student);
  app.listen(80);
}
main();
