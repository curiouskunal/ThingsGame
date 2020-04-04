import React from 'react';
import { Component } from 'react';
import * as Firebase from 'firebase'
import JoinGame from './joinGame'
import _ from 'lodash'
import './home.scss'

import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class NewGame extends JoinGame {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roomcode: "",
      playerKey: "",
    }
  }

  componentWillMount() {
    document.title = "Create New Things Game Room"
  }

  async _getRoomCode() {
    let id = Math.floor(Math.random() * 2405) + 1

    const databaseRoot = Firebase.database().ref();
    const wordList = databaseRoot.child('words');

    await wordList.child(id).once('value').then(snap => {
      this.setState({ roomcode: snap.val() });
    })

  }

  async _connectToRoom() {
    const databaseRoot = Firebase.database().ref();
    const gameRoomList = databaseRoot.child('gameroom')

    let id = this.state.roomcode;

    gameRoomList.child(id).transaction(function (currentData) {
      if (currentData === null) {
        return { timestamp: Date.now() };
      } else {
        console.log('Room already exists.');
        return; // Abort the transaction.
      }
    }, function (error, committed, snapshot) {
      if (error) {
        console.log('Failed to create Game Room!', error);
      } else if (!committed) {
        // aborted the transaction because id already exists
        this.startGame();
      }
    });
  }

  async joinGame() {
    const databaseRoot = Firebase.database().ref().child('gameroom').child(`${this.state.roomcode}`).child('players');
    await databaseRoot.push(this.state.name).then((snap) => {
      this.setState({ playerKey: snap.key });
    })

    this.navigateToGameRoom();
  }

  async startGame() {
    console.log("clicked")
    await this._getRoomCode();
    await this._connectToRoom();
    await this.joinGame();
    console.log('done')
  }

  render() {
    return (
      <div className="center">
        <h1>New Game</h1>

        <div>
          <Input
            style={{ width: '300px' }}
            placeholder="Enter your Name"
            onChange={(e) => { this.onChange('name', e) }}
            value={this.state.name || ''}
            prefix={<UserOutlined className="site-form-item-icon" />}
            onPressEnter={() => { this.startGame() }}
          />
        </div>
        <Button type="primary" onClick={() => { this.startGame() }}> Start Game </Button>
      </div>
    );
  }
}
export default NewGame;
