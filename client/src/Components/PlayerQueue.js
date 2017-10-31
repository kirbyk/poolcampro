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
<div>
  <span className={css`color: red;`}>{props.player.name}</span>
  <span className={css`color: green;`}>{props.player.wins}</span>
  <span className={css`color: blue;`}>{props.player.losses}</span>
</div>

class PlayerQueue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queue: []
    }
  }

  renderPlayersInQueue() {
    // let items = this.state.queue;
    let items = [
      { name: "Nick Larew", wins: "10", losses: "8" },
      { name: "Kirby Kohlmorgen", wins: "30", losses: "4" }
    ]
    return items.map(
      p => <PlayerQueueItem player={p} />
    )
  }

  render() {
    return(
      <div className={playerQueue}>
        <Button onClick={() => console.log("add player")}>Add Player</Button>
        <Button onClick={() => console.log("remove player")}>Remove Player</Button>
        {this.renderPlayersInQueue()}
      </div>
    )
  }
}
export default PlayerQueue