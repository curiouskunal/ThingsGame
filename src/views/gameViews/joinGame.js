import React from 'react';
import { Component } from 'react';
import * as Firebase from 'firebase'
import _ from 'lodash'
import './home.scss'

import { Input, Button } from 'antd';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';

class JoinGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roomcode: "",
      playerKey: "",
    }
  }

  componentWillMount() {
    document.title = "Join Things Game Room"
  }

  componentDidMount() {
    if (this.props.location.search) {
      this.setState({ roomcode: this.props.location.search.substr(1) });
    }
  }

  navigateToGameRoom() {
    this.props.history.push({
      pathname: `/room/${this.state.roomcode}`,
      state: {
        playerKey: this.state.playerKey
      }
    });
  }

  async getListOfExistingGamesKeys() {
    await fetch("https://thingsv2-957e7.firebaseio.com/gameroom.json?shallow=true")
      .then(res => res.json())
      .then(result => {
        this.setState({ existingGames: Object.keys(result) });
      })
  }

  async joinGame() {
    await this.getListOfExistingGamesKeys();
    console.log(this.state.existingGames)
    if (this.state.existingGames.includes(this.state.roomcode)) {
      // alert("room code does exist")
      const databaseRoot = Firebase.database().ref().child('gameroom');
      const room = databaseRoot.child(`${this.state.roomcode}`).child('players');
      await room.push(this.state.name).then((snap) => {
        this.setState({playerKey: snap.key});
      })

      this.navigateToGameRoom();
    } else {
      alert("room code does not exist ")
      
    }
  }

  onChange(state, e) {
    this.setState({ [state]: e.target.value });
  }

  render() {
    return (
      <div className="center">
        <h1>Join Game</h1>
        <div>
          <Input
            style={{ width: '300px' }}
            placeholder="Enter your Name"
            onChange={(e) => { this.onChange('name', e) }}
            value={this.state.name || ''}
            prefix={<UserOutlined className="site-form-item-icon" />}
            onPressEnter={() => { this.joinGame() }}
          />
        </div>
        <div>
          <Input
            style={{ width: '300px' }}
            placeholder="Enter your room code"
            onChange={(e) => { this.onChange('roomcode', e) }}
            value={this.state.roomcode || ''}
            prefix={<HomeOutlined />}
            onPressEnter={() => { this.joinGame() }}
          />
        </div>
        <Button onClick={() => { this.joinGame() }}> Join Game </Button>
      </div>
    );
  }
}
export default JoinGame;
