import express from 'express';
import router from './router';
import colors from 'colors';
import db from './config/db';

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

server.use('/api/users', router);

export default server;