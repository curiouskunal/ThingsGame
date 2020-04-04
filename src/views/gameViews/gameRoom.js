import React from 'react';
import {Component} from 'react';
import * as Firebase from 'firebase'
import './home.scss'

import Lobby from './lobby'

class GameRoom extends Component {

  constructor(props){
    super(props);
    this.state = {
      players: {},
      status: "lobby",
      isHost: false,
      roomcode: this.props.match.params.id
    }
    this.databaseRoot = ""
  }

  componentWillMount(){
    document.title = "Things Room: " + this.props.match.params.id
  }

  async componentDidMount(){
    this.getPlayerKey();

    this.databaseRoot = Firebase.database().ref().child('gameroom').child(this.state.roomcode);
    
    this.getPlayerList();
    this.getGameStatus();
    this.onPlayerRemoved();
  }

  getPlayerKey(){
    if(this.props.location.search !== ""){
      if(this.props.store.playerKey === undefined){
        this.props.setPlayerKey(this.props.location.search.substr(1))
      }
    }else{
      this.navigateToJoinGameRoom();
    }
  }

  async getPlayerList(){
    await this.databaseRoot.child('players').on('value', snapshot => {
      this.setState({
        players: snapshot.val(),
      });
    });
  }

  async getGameStatus(){
    await this.databaseRoot.child('hooks').on('value', snapshot => {
      if (snapshot.val()){
        this.setState({
          status: snapshot.val().status,
          host: snapshot.val().host,
          isHost: this.isHost(snapshot.val().host),
        });
      }
    })
  }

  async onPlayerRemoved(){
    await this.databaseRoot.child('players').on('child_removed', snapshot => {
      console.log()
      if (this.props.store.playerKey === snapshot.key){
        // TODO: give removed player notificaion
        this.navigateToJoinGameRoom();
      }
    });
  }

  navigateToJoinGameRoom(){
    this.props.history.push({
      pathname: `/join`,
      search: this.state.roomcode,
    });
  }

  isHost(hostKey){
      return (this.props.store.playerKey === hostKey);
  }

  returnToLobby(){
    this.databaseRoot.child('hooks').update({status: 'lobby'});
  }
  render(){
    return (
    <div className="center">
    <h1>{this.state.roomcode}</h1>
    <h3 style={{color: "blue"}}>{this.props.store.playerKey}</h3>
    {this.state.status === 'lobby' && <Lobby playerKey={this.props.store.playerKey} host={this.state.host} players={Object.entries(this.state.players)} databaseRoot={this.databaseRoot}/>}
    </div>
    );
  }
}
export default GameRoom;


// "lobby / selectCard /enterResponse / readResponse /playing / gameOver"
