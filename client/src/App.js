import React, { Component } from 'react';
// import { BrowserRouter, Link, Route } from 'react-router-dom';
import AppLayout from './Components/AppLayout'
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
    return this.state.user
            ? <AppLayout logout={() => this.logout()}/>
            : <LoginScreen login={() => login()} />
  }
}
export default App;