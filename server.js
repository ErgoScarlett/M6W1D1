import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { authorsRoute } from './src/routes/authors.routes.js';

config();

const server = express();

server.use(express.json())

server.use('/authors', authorsRoute);


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