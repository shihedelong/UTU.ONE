import express from 'express';
import { getCoins } from '../controllers/coins.js';

const router = express.Router();

router.get('/', getCoins)

export default router;