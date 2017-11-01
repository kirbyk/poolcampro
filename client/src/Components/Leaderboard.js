import React, { Component } from 'react';
import { css } from 'react-emotion';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';

const leaderboard = css`
  width: 100%
`

const LeaderboardItem = (props) => {
  let player = props.player
  return (
    <li className={css`
      display: flex;
      flex-direction: row;
      width: 100%;
    `}>
      <div className={css`flex-grow: 3`}>{player.name}</div>
      <div className={css`flex-grow: 1`}>{player.wins}</div>
      <div className={css`flex-grow: 1`}>{player.losses}</div>
      <div className={css`flex-grow: 1`}>{player.elo}</div>
    </li>
  )
}

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.renderItems()
  }

  renderItems() {
    // console.log(this.props.players);
  }

  render() {
    return (
      <div className={leaderboard}>
      <Typography type="title">
        Leaderboard
      </Typography>
      <List>
        <ListItem button style={{"font-weight": "bold"}}>
        <LeaderboardItem player={{name: "Name", wins: "Wins", losses: "Losses", elo: "ELO Rating"}} />
        </ListItem>
        <ListItem button>
        <LeaderboardItem player={{name: "Nick Larew", wins: 10, losses: 8, elo: 1400}} />
        </ListItem>
      </List>
      </div>
    )
  }
}

export default Leaderboard
