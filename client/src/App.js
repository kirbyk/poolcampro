import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import AppLayout from './Components/AppLayout'
import ControlPanel from './Components/ControlPanel'
import Leaderboard from './Components/Leaderboard';
import LoginScreen from './Components/LoginScreen';
import { login, logout, getUserProfile } from './PoolcamStitch';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { user: getUserProfile() }
  }

  logout() {
    logout()
    this.setState({ user: null })
  }

  render() {
    if (this.state.user) {
      return (
        <AppLayout>
          <ControlPanel logout={() => this.logout()} />
          <Leaderboard players={[{ name: "Nick Larew", wins: 10, losses: 8 }, { name: "Nick Larew", wins: 10, losses: 8 }]} />
        </AppLayout>
      )
    }
    else {
      return <LoginScreen login={() => login()} />
    }
  }
}
export default App;