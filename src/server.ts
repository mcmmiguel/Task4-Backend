import express from 'express';
import colors from 'colors';
import db from './config/db';
import usersRouter from './router/usersRouter';
import loginRouter from './router/loginRouter';

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

// Read data from forms
server.use(express.json());

server.use('/api/login', loginRouter);
server.use('/api/users', usersRouter);


export default server;