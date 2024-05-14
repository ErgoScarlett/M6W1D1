import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import googleStrategy from './src/auth/passport.js'
import registerRoute  from './src/routes/register.routes.js';
import { authorsRoute } from './src/routes/authors.routes.js';
import { postBlogRoute } from './src/routes/posts.routes.js';
import endpoints from 'express-list-endpoints';
import 'dotenv/config';

const server = express();

server.use(cors());
server.use(express.json());
passport.use("google", googleStrategy);
server.use('/register', registerRoute);
server.use('/authors', authorsRoute);
server.use('/posts', postBlogRoute);

const initServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL_REMOTE);
    console.log('Connected to the Database');

    server.listen(process.env.PORT, () => {
      console.log('Server listening on port ' + process.env.PORT);
      console.log('The server has these endpoints: \n');
      console.table(endpoints(server));
    });
  } catch (error) {
    console.log('error connecting to the database', error);
  }
};

initServer();
