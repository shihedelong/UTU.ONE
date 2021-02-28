import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import coinRoutes from './routes/coins.js';

// const coinRoutes = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.use('/coins', coinRoutes);

// mongodb.com/cloud/atlas
const CONNECTION_URL = 'mongodb+srv://shihedelong:shihedelong123@cluster0.2owq7.mongodb.net/coins?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
