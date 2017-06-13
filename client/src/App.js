import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatRoom from './ChatRoom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Chat Box</h2>
        </div>
        <ChatRoom />
        
      </div>
    );
  }
}

export default App;
