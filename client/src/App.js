import React, { Component } from 'react';
import AppLayout from './Components/AppLayout'
import ControlPanel from './Components/ControlPanel'
import Leaderboard from './Components/Leaderboard';
import LoginScreen from './Components/LoginScreen';

import { StitchClient } from 'mongodb-stitch';
const client = new StitchClient('poolcam-pro-nqood');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { user: this.getUserProfile() }
  }

  getUserProfile() {
    if (client.authedId()) {
      let user = {}
      client.userProfile()
        .then(res => user = res.data)
        .catch(err => console.log(err))
      return user
    } else {
      return null
    }
  }

  login() {
    console.log("logging in");
    client.authenticate("google")
  }

  logout() {
    console.log("logging out")
    client.logout()
    .then(this.setState({ user: null }))
    .catch(e => console.log(e))
  }

  render() {
    if (this.state.user) {
      return (
        <AppLayout>
          <ControlPanel logout={() => this.logout()}/>
          <Leaderboard players={[{ name: "Nick Larew", wins: 10, losses: 8 }, { name: "Nick Larew", wins: 10, losses: 8 }]} />
        </AppLayout>
      )
    }
    else {
      return <LoginScreen login={() => this.login()} />
    }
  }
}
export default App;