import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { authorsRoute } from './src/routes/authors.routes.js';
import { postBlogRoute } from './src/routes/posts.routes.js';
import { commentsRoute } from './src/routes/comments.routes.js';

config();

const server = express();

server.use(cors());
server.use(express.json())

server.use('/authors', authorsRoute);
server.use('/posts', postBlogRoute);
server.use('/comments', commentsRoute);


const initServer = async ()=>{
    try {
         mongoose.connect(process.env.MONGO_URL_REMOTE);

        console.log('Connected to the Database');
        
        server.listen(process.env.PORT, ()=>{
            console.log('Server listening on port '+process.env.PORT)
        })

    } catch (error) {
        
        console.log('error connecting to the database');
    }
}

initServer();