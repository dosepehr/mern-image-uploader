import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import bodyParser from 'body-parser';

import productsRouter from './routes/productsRoutes.js';

// ! create server
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(fileUpload());
server.use(express.static('public'))

// ! roots
server.use('/api/products', productsRouter);

// ! server listen to port
server.listen(4000, () => {
    console.log('server is running on port 4000');
});
