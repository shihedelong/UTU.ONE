import express from 'express';
import CoinDetail from '../models/coinDetail.js';

const router = express.Router();

export const getCoins = async (req, res) => { 
    try {
        const coinDetail = await CoinDetail.find({
            // In the future, the server time can be obtained directly.
            "Date" : "Dec 04, 2019"
        }).sort({
            "Market" : -1
        });
                
        res.status(200).json(coinDetail);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} 
