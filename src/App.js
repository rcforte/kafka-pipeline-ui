import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {LineChart, Line} from 'recharts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {prices:[]}
  }

  componentDidMount() {
    setInterval(() => {
      if(true) {
        console.log('sending request to the server...');
        fetch('http://localhost:8080/api/v1/prices/')
          .then(res => res.json())
          .then(prices => this.setState({prices}));
      } else {
        // for debugging
        console.log('rendering')
        var data = []
        for(var i=0; i<10; i++)
          data.push({sym:'SPX Index', price:Math.random()});
        this.setState({prices:data});
      }
    }, 3000);
  }

  render() {
    return (
      <LineChart width={400} height={400} data={this.state.prices}>
        <Line type="monotone" dataKey="price" stroke="#8884d8"/>
      </LineChart>
    );
  }
}

export default App;
