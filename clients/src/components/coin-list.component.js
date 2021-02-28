import React, { Component } from 'react';
import axios from 'axios';

const Coin = props => (
    <tr>            
        <td>{props.coin.Currency}</td>
        <td>{props.coin.Date}</td>
        <td>${props.coin.Open}</td>
        <td>${props.coin.High}</td>
        <td>${props.coin.Low}</td>
        <td>${props.coin.Close}</td>
        <td >{props.coin.Change24h.toFixed(2)}%</td>
        <td>{props.coin.Change7d.toFixed(2)}%</td>
        <td>{props.coin.Change1m.toFixed(2)}%</td>
        <td>${props.coin.Volume}</td>
        <td>${props.coin.Market}</td>
    </tr>
)

export default class CoinList extends Component {

    constructor(props) {
        super(props);
        this.state = {coins: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/coins/')
            .then(response => {
                this.setState({ coins: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    coinList() {
        return this.state.coins.map(function(currentCoin, i){
            return <Coin coin={currentCoin} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Coins List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Date</th>
                            <th>Open</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Close</th>
                            <th>24h</th>
                            <th>7d</th>
                            <th>1m</th>
                            <th>Volume</th>
                            <th>Market</th>

                        </tr>
                    </thead>
                    <tbody>
                        { this.coinList() }
                    </tbody>
                </table>
            </div>
        )
    }
}