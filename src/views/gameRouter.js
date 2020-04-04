import React from 'react';
import {Component} from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom'

import Home from './gameViews/home'
import NewGame from './gameViews/newGame'
import JoinGame from './gameViews/joinGame'
import GameRoom from './gameViews/gameRoom'


class GameRouter extends Component {


  render(){
    return (
      <BrowserRouter>
        <Route path="/" exact component={Home}/>
        <Route path="/new" exact component={NewGame}/>
        <Route path="/join" exact component={JoinGame}/>
        <Route path="/room/:id" exact component={GameRoom}/>
      </BrowserRouter>

      // <BrowserRouter>
      //   <Route path="/" exact render={(props) => <Home {...props} navigateTo={this.navigateTo} />}/>
      //   <Route path="/new" exact render={(props) => <NewGame {...props} navigateTo={this.navigateTo} />}/>
      //   <Route path="/join" exact render={(props) => <JoinGame {...props} navigateTo={this.navigateTo} />}/>
      //   <Route path="/room/:id" exact render={(props) => <GameRoom {...props} navigateTo={this.navigateTo} />}/>
      // </BrowserRouter>

    );
  }
}
export default GameRouter;
