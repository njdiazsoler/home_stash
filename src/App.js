import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './client/admin/screens/HomeOverview';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Home>
          </Home>
        </header>
      </div>
    );
  }
}

export default App;
