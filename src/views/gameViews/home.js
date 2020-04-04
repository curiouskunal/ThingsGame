import React from 'react';
import {Component} from 'react';
import { Button } from 'antd';
import './home.scss'

class Home extends Component {

  constructor(){
    super();
  }

  navigateTo(path){
    this.props.history.push(path);
  }


  render(){
    return (
    <div className="center">
      <Button onClick={()=>{this.navigateTo('/new')}}>New Game</Button>
      <Button onClick={()=>{this.navigateTo('/join')}}>Join Game</Button>
    </div>
    );
  }
}
export default Home;
