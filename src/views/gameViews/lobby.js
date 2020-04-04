import React from 'react';
import {Component} from 'react';
import './home.scss'

class Lobby extends Component {

  removePlayer(player){
    // TODO: change from anyone can remove players that are not host & themselfs to only host can remove players
    if(player !== this.props.host && player !== this.props.playerKey){
      this.props.databaseRoot.child('players').child(player).remove()
    }
  }

  render(){
    return (
      <div>
      {this.props.players.map((item, index)=> (
        <div key={item[0]} onClick={this.removePlayer.bind(this, item[0])}> {item[1]} </div>
      ))}
      </div>
    );
  }
}
export default Lobby;
