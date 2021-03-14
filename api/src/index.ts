/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import { join } from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import teacher from './teacher';
import user from './user';
import auth from './auth';

require('dotenv-safe').config();

const express = require('express');

const prod = process.env.NODE_ENV === 'production';

async function main() {
  await createConnection({
    type: 'postgres',
    database: process.env.DATEBASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    entities: [join(__dirname, './entities/*.*')],
    logging: !prod,
    synchronize: !prod,
    dropSchema: false,
  });
  const app = express();
  passport.serializeUser((userData: any, done) => {
    done(null, userData.accessToken);
  });
  app.use(cors({ origin: `${process.env.FRONTEND_URL}`, credentials: true }));
  app.options(
    '*',
    cors({
      origin: `${process.env.FRONTEND_URL}`,
      credentials: true,
      methods: ['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'],
    })
  );
  app.use(passport.initialize());
  app.use(express.json({ limit: '10MB' }));
  app.use(cookieParser());

  app.use('/teacher', teacher);
  app.use('/user', user);
  app.use('/auth', auth);
  app.listen(80);
}
main();
