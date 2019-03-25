import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {LineChart, Line} from 'recharts';

class App extends Component {
  constructor(props) {
    super(props);
    this.eventSource = new EventSource('//localhost:8080/api/v1/prices/sse');
    this.updatePrice = this.updatePrice.bind(this);
    this.makeRestCall = this.makeRestCall.bind(this);
    this.state = {
      prices: []
    };
  }

  componentDidMount() {
    this.eventSource.onmessage = e => this.updatePrice(JSON.parse(e.data));
  }

  makeRestCall(){
    setInterval(() => {
      console.log('sending request to the server...');
      fetch('http://localhost:8080/api/v1/prices/')
        .then(res => res.json())
        .then(prices => this.setState({prices}));
    }, 3000);
  }

  updatePrice(newPrice) {
    let oldPrices = this.state.prices;
    let newPrices = []
    for(var i=0; i<oldPrices.length; i++)
      newPrices.push(oldPrices[i]);
    newPrices.push(newPrice);
    this.setState({prices: newPrices});
  }

  render() {
    return (
      <div>
        <div>
          <LineChart width={400} height={400} data={this.state.prices}>
            <Line type="monotone" dataKey="price" stroke="#8884d8"/>
          </LineChart>
        </div>
      </div>
    );
  }
}

export default App;
