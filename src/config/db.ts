import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: false
        }
    }
});

export default db;
