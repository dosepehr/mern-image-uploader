import { Sequelize } from 'sequelize';
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const Product = db.define(
    'products',
    {
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        url: DataTypes.STRING,
    },
    {
        freezeTableName: true,
    }
);

export default Product;

// (async () => {
//     await db.sync();
// })();
