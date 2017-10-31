import React, { Component } from 'react';
import { css } from 'react-emotion';

const LeaderboardItem = (props) => {
  let player = props.player
  return (
    <li className={css`
      display: flex;
      flex-direction: row;
      background: palevioletred;
      width: 600px;
    `}>
      <div className={css`flex-grow: 3`}>{player.name}</div>
      <div className={css`flex-grow: 1`}>{player.wins}</div>
      <div className={css`flex-grow: 1`}>{player.losses}</div>
    </li>
  )
}

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.renderItems()
  }

  renderItems() {
    console.log(this.props.players);
  }
  
  render() {
    return (
      <div>
      <p>Leaderboard</p>
      <LeaderboardItem player={{name: "Nick Larew", wins: 10, losses: 8}} />
      </div>
    )
  }
}

export default Leaderboard