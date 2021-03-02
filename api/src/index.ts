require("dotenv-safe").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { join } from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import teacher from "./teacher";
import user from "./user";
import rateLimit from "express-rate-limit";

const express = require("express");

const __prod__ = process.env.NODE_ENV === "production";

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
  app.use(cors({ origin: `${process.env.FRONTEND_URL}`, credentials: true }));
  app.use(passport.initialize());
  app.use(express.json());
  app.use(cookieParser());
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15,
  });

  // only apply to requests that begin with /api/
  app.use("/auth/", authLimiter);
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL}/auth/google/callback`,
      },
      async (_accessToken, _refreshToken, profile, cb) => {
        let user = await User.findOne({
          where: { email: profile.emails![0].value },
        });
        if (user) {
          user.name = profile.displayName;
          await user.save();
        } else if (__prod__) {
          return cb();
        } else {
          user = await User.create({
            name: profile.displayName,
            nickname: profile.displayName.split(" ")[0],
            teacher: true,
            email: profile.emails![0].value,
          }).save();
        }
        return cb(undefined, {
          accessToken: jwt.sign(
            {
              email: user.email,
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
          domain: __prod__ ? ".alextesting.ninja" : "localhost",
          secure: __prod__,
        })
        .redirect(`${process.env.FRONTEND_URL}`);
    }
  );
  app.use("/teacher", teacher);
  app.use("/user", user);
  app.listen(80);
}
main();
