import React from 'react';
import {Component} from 'react';
import * as Firebase from 'firebase'
import './App.scss';

import Header from './views/header'
import GameRouter from './views/gameRouter'
import Footer from './views/footer'

class App extends Component {
  
  render(){
    return (
    <div className="AppWrapper">
      <Header/>
      <GameRouter/>
      <Footer/>
    </div>
    );
  }
}
export default App;
