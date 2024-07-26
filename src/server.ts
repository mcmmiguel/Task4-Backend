import express from 'express';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import db from './config/db';
import usersRouter from './router/usersRouter';
import authRouter from './router/authRouter';

async function connectDB() {
    try {
        await db.authenticate();
        db.sync(); //to update new models or changes
        console.log(colors.magenta('DB connected successfully'));
    } catch (error) {
        console.log(error);
        console.log(colors.red('Error: unable to connect to database'));
    }
}

connectDB();

const server = express();

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
            console.log('Done');
        } else {
            callback(new Error('Error de CORS'));
        }
    }
}

server.use(cors(corsOptions));

// Read data from forms
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


export default server;