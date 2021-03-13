/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import User from './entities/User';

const express = require('express');

const prod = process.env.NODE_ENV === 'production';

const router = express.Router();

router.put('/updateNickname', async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === 'string') {
    const rawToken = req.headers.jwt as string;
    const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
      email: string;
      teacher: boolean;
    };
    if (token.email) {
      await User.update(
        { email: token.email },
        { nickname: req.body.nickname },
      );
      return res
        .status(204)
        .cookie(
          'auth',
          jwt.sign(
            {
              email: token.email,
              teacher: token.teacher,
              nickname: req.body.nickname,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '1y',
            },
          ),
          {
            maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
            domain: prod ? '.alextesting.ninja' : 'localhost',
            secure: prod,
          },
        )
        .send();
    }
  }
  return res.status(401).send('no auth');
});
router.get('/getInfo', async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === 'string') {
    const rawToken = req.headers.jwt as string;
    try {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        email: number;
      };
      if (token.email) {
        return res
          .status(200)
          .send(JSON.stringify(await User.findOne(token.email)));
      }
    } catch {
      return res.status(500).end();
    }
  }
  return res.status(401).send('no auth');
});
router.get('/getClasses', async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === 'string') {
    const rawToken = req.headers.jwt as string;
    try {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET) as {
        email: number;
      };
      if (token.email) {
        return res.status(200).send(
          (await User.findOne(token.email, {
            relations: ['classes'],
          }))!.classes.sort((a, b) => a.startTime - b.startTime),
        );
      }
    } catch {
      res.status(500).end();
    }
  }
  return res.status(401).send('no auth');
});
router.get('/getInfo/:email', async (req: Request, res: Response) => {
  if (typeof req.headers.jwt === 'string') {
    const rawToken = req.headers.jwt as string;
    try {
      const token = jwt.verify(rawToken, process.env.JWT_SECRET);
      if (token) {
        return res
          .status(200)
          .send(JSON.stringify(await User.findOne(req.params.email)));
      }
    } catch {
      res.status(500).end();
    }
  }
  return res.status(401).send('no auth');
});

export default router;
