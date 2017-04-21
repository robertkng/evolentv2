import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className="home">
        <img src={require('./evolenthealth.png')} />
      </div>
    );
  }
}

export default Home;
