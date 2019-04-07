import React, { Component } from 'react';
import Header from './Header';
import Weather from './Weather';

class Container extends Component {
  render() {
    return (
      <div className='weather-app-container'>
      	<Header />
      	<Weather />
      </div>
    );
  }
}


export default Container;