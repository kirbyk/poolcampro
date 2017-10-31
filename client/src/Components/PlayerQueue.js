import React, { Component } from 'react';
import { css } from 'react-emotion';
import Button from './Button';

const playerQueue = css`
  width: 100%;
  background: skyblue;
  align-items: center;
  text-align: center;
  margin: 30px 0 0 0;
`

const PlayerQueueItem = (props) =>
<div className={css`
  height: 24px;
  line-height: 24px;
  width: 100%;
  background: teal;
  display: flex;
  flex-direction: row;
  margin: 3px 0 0 0;
  padding: 2px 0;
  justify-content: center;
`}>
  <span className={css`min-width: 150px; text-align: left`}>{props.player.name}</span>
  <span className={css`min-width: 50px;`}>W: {props.player.wins}</span>
  <span className={css`min-width: 50px;`}>L: {props.player.losses}</span>
  <span className={css`font-weight: bold; padding: 0px 5px; border: 1px solid black;`}>X</span>
</div>

const player = { name: "Dev Ittycheria", wins: 42, losses: 0 }

class PlayerQueue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queue: [
        { name: "Nick Larew", wins: "10", losses: "8" },
        { name: "Kirby Kohlmorgen", wins: "30", losses: "4" }
      ]
    }
  }

  renderPlayersInQueue() {
    return this.state.queue.map(
      p => <PlayerQueueItem player={p} key={p.name} />
    )
  }

  addPlayerToQueue(player) {
    let queue = this.state.queue
    if (!queue.includes(player)) {
      queue.push(player)
      this.setState({ queue: queue})
    } else {
      console.log('User already in queue')
    }
  }

  removePlayerFromQueue(player) {
    let queue = this.state.queue.filter(
      p => p.name !== player.name
    )
    this.setState({ queue: queue })
  }

  render() {
    return(
      <div className={playerQueue}>
        <Button onClick={() => this.addPlayerToQueue(player)}>Add Player</Button>
        <Button onClick={() => this.removePlayerFromQueue(player)}>Remove Player</Button>
        {this.renderPlayersInQueue()}
      </div>
    )
  }
}
export default PlayerQueue