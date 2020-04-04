import React from 'react';
import {Component} from 'react';
import * as Firebase from 'firebase'
import './home.scss'

import Lobby from './lobby'

class GameRoom extends Component {

  constructor(){
    super();
    this.state = {
      players: {},
      status: "lobby",
      isHost: false,
    }
    this.databaseRoot = ""
  }

  componentWillMount(){
    document.title = "Things Room: " + this.props.match.params.id
  }

  async componentDidMount(){
    this.databaseRoot = Firebase.database().ref().child('gameroom').child(this.props.match.params.id);
    await this.databaseRoot.child('players').on('value', snapshot => {
       this.setState({
         players: snapshot.val(),
       })
     });
     await this.databaseRoot.child('hooks').on('value', snapshot => {
       if (snapshot.val()){
         this.setState({
           status: snapshot.val().status,
           isHost: this.isHost(snapshot.val().host),
         });
       }
     })
  }

  isHost(hostKey){
      // return (this.props.location.state.playerKey === hostKey);
  }

  removePlayer(player){

  }

  returnToLobby(){
    this.databaseRoot.child('hooks').update({status: 'lobby'});
  }
  render(){
    return (
    <div className="center">
    <h1>{this.props.match.params.id}</h1>
    <h3>{this.props.location.state.playerKey}</h3>
    {this.state.status === 'lobby' && <Lobby players={Object.entries(this.state.players)}/>}
    </div>
    );
  }
}
export default GameRoom;


// "lobby / selectCard /enterResponse / readResponse /playing / gameOver"
