import React, { Component } from 'react';
import router from './router';
import Nav from './components/Nav/Nav';
import Footer from './components/Nav/Footer';
import './App.css';
// eslint-disable-next-line
import ComingSoon from './components/Complexity/ComingSoon';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <ComingSoon /> */}
        <Nav />
        {router}
        <Footer />
      </div>
    )
  }
}

export default App;
