import React from 'react';
import {Component} from 'react';
import './home.scss'

class Lobby extends Component {

  render(){
    return (
      <div>
      {this.props.players.map((item, index)=> (
        <div key={item[0]}> {item[1]} </div>
      ))}
      </div>
    );
  }
}
export default Lobby;
