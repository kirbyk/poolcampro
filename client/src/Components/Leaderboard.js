import React, { Component } from 'react';
import { css } from 'react-emotion';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

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

class GameLog extends Component {
  constructor(props) {
    super(props)
    this.state = { games: [], open: false }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <Button
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div>
        <Button label="Scrollable Dialog" onClick={this.handleOpen} />
        <Dialog
          title="Scrollable Dialog"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        </Dialog>
      </div>
    );
  }
}

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = { leaders: [], showGameLog: false, games: [] }
  }

  componentDidMount() {
    axios.get("https://kirby.ngrok.io/leaderboard/topTen").then(leaders => this.setState({ leaders: leaders.data.players }))
  }

  showPlayerGameLog(playerId) {
    axios.get(`https://kirby.ngrok.io/player/${playerId}/previousGames`).then(games => this.setState({ games: games.data.games }))
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const leaderItems = this.state.leaders.map(leader => {
      var i = leader._id
      return <ListItem button onClick={(leader) => this.showPlayerGameLog(i)}><LeaderboardItem player={ leader } /></ListItem>
    })
    console.log(this.state.games)
    return (

      <div className={leaderboard}>
      <Typography type="title" className={css`
        padding: 10px;
      `}>
        Leaderboard
      </Typography>
      <Divider />
      <List>
        <ListItem style={{"font-weight": "bold"}}>
        <LeaderboardItem player={{name: "Name", wins: "Wins", losses: "Losses", elo: "ELO Rating"}} />
        </ListItem>
        {leaderItems}
      </List>
      <Button raised color={"primary"} className={css`
        margin: 0 0 0 10px;
      `}>
        View Full Leaderboard
      </Button>
      </div>
    )
  }
}

export default Leaderboard
