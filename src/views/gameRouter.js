import React from 'react';
import {Component} from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom'

import Home from './gameViews/home'
import NewGame from './gameViews/newGame'
import JoinGame from './gameViews/joinGame'
import GameRoom from './gameViews/gameRoom'


class GameRouter extends Component {


  constructor(props){
    super(props);
    this.state = {
      playerKey: undefined
    }

    this.setPlayerKey = this.setPlayerKey.bind(this)
  }

  setPlayerKey(key){
    this.setState({ playerKey: key });
  }


  render(){
    return (
      <BrowserRouter>
        <Route path="/" exact render={(props) => <Home {...props} />}/>
        <Route path="/new" exact render={(props) => <NewGame {...props} setPlayerKey={this.setPlayerKey} store={this.state} />}/>
        <Route path="/join" exact render={(props) => <JoinGame {...props} setPlayerKey={this.setPlayerKey} store={this.state} />}/>
        <Route path="/room/:id" exact render={(props) => <GameRoom {...props} setPlayerKey={this.setPlayerKey} store={this.state}/>}/>
      </BrowserRouter>

    );
  }
}
export default GameRouter;
