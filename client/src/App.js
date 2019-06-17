import React, { Component } from 'react';
import './App.css';
import router from './router';
import Nav from './components/Nav/Nav';
import ComingSoon from './components/Complexity/ComingSoon';

class App extends Component {
  render() {
    return (
      <div>
        <ComingSoon />
        {/* <Nav />
        { router } */}
      </div>
    );
  }
}

export default App;
