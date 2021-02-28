import mongoose from 'mongoose';

const coinSchema = mongoose.Schema({
    Currency: String,
    Date: String,
    open: String,
    high: String,
    low: String,
    close: String,
    volume: String,
    market: String,
})

var CoinDetail = mongoose.model('CoinDetail', coinSchema);

export default CoinDetail;