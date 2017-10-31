import React, { Component } from 'react';
import { css } from 'react-emotion';
import 'whatwg-fetch';
// import { getPlayersInQueue } from '../PoolcamStitch';
import Button from './Button';
import PlayerQueue from './PlayerQueue';

const controlPanel = css`
  min-width: 1200px;
  background: red;
  align-items: center;
  text-align: center;
`
class ControlPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      running: false,
      message: "Pool cam pro is God",
      queue: []
    }
  }

  componentDidMount() {
    //getPlayersInQueue()
  }

  renderButton() {
    let buttonText = this.state.running ? "End Game" : "Begin Game"
    return <Button onClick={() => this.handleButtonClick()}>{buttonText}</Button>
  }

  handleButtonClick() {
    if (this.state.running) { this.endGame() }
    else { this.beginGame() }
  }

  beginGame() {
    fetch('https://f0140d23.ngrok.io/beginGame', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.status === 200) { return res }
      else {
        var error = new Error(res.statusText)
        error.response = res
        throw error
      }
    })
    .then(res => res.json())
    .then(data => this.setState({ message: data.msg, running: true }))
    .catch(err => console.log(err))
  }

  endGame() {
    fetch('http://f0140d23.ngrok.io/endGame', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.status === 200) { return res }
      else {
        var error = new Error(res.statusText)
        error.response = res
        throw error
      }
    })
    .then(res => res.json())
    .then(data => this.setState({ message: data.msg, running: false }))
  }

  render() {
    return (
      <div className={controlPanel}>
        <p>{this.state.message}</p>
        {this.renderButton()}
        <Button onClick={() => this.props.logout()}>Logout</Button>
        <PlayerQueue players={this.state.queue} />
      </div>
    );
  }
}

export default ControlPanel;