import { Sequelize } from 'sequelize';
const db = new Sequelize('uploader', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;
