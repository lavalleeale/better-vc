/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Response } from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './entities/User';

const express = require('express');
require('dotenv-safe').config();

const prod = process.env.NODE_ENV === 'production';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

router.use('/', authLimiter);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      let foundUser = await User.findOne({
        where: { email: profile.emails![0].value },
      });
      if (foundUser) {
        foundUser.name = profile.displayName;
        await foundUser.save();
      } else if (prod) {
        return cb('Email not Found');
      } else {
        foundUser = await User.create({
          name: profile.displayName,
          nickname: profile.displayName.split(' ')[0],
          teacher: true,
          email: profile.emails![0].value,
        }).save();
      }
      return cb(undefined, {
        accessToken: jwt.sign(
          {
            email: foundUser.email,
            teacher: foundUser.teacher,
            nickname: foundUser.nickname,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1y',
          }
        ),
      });
    }
  )
);
router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['email', 'profile'],
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: any, res: Response) => {
    res
      .cookie('auth', req.user.accessToken, {
        maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
        domain: prod ? '.alextesting.ninja' : 'localhost',
        secure: prod,
      })
      .redirect(`${process.env.FRONTEND_URL}`);
  }
);

export default router;
