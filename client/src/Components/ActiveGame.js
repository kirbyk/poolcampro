import React from 'react';
import Button from 'material-ui/Button';
import { css } from 'emotion';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PlayerAutosuggest from './PlayerAutosuggest.js';
import PlayerQueue from './PlayerQueue';
import axios from 'axios'


export default class ActiveGame extends React.Component {
  state = {
    open: false,
    players: [],
    gameInProgress: false,
  };

  componentDidMount() {
    axios.get('http://kirby.ngrok.io/players/suggestions')
      .then(response => {
        this.setState({
          players: response.data.suggestions
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  beginGame = () => {
    const player1Name = document.querySelector('#player1').value;
    const player2Name = document.querySelector('#player2').value;

    const player1ID = this.state.players.filter(p => p.name === player1Name)[0]._id
    const player2ID = this.state.players.filter(p => p.name === player2Name)[0]._id

    axios.post('http://kirby.ngrok.io/beginGame', {
        player1: player1ID,
        player2: player2ID,
      })
      .then(response => {
        console.log(response);
        this.setState({
          gameInProgress: true,
        });
        this.closeDialog();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let newGameOrQueue = null;

    if (this.state.gameInProgress) {
      newGameOrQueue = <PlayerQueue styles={this.props.styles} />
    } else {
      newGameOrQueue = <Button raised color="primary" onClick={this.handleClickOpen}>Start New Game</Button>
    }

    return (
      <div>
        { newGameOrQueue }

        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>New Game</DialogTitle>

          <DialogContent>
            <DialogContentText>
              To start a new game enter your name and your opponent's name and
              click begin.
            </DialogContentText>

            <PlayerAutosuggest
              suggestions={this.state.players}
              autoFocus
              id="player1"
              label="Player 1"
            />

            <PlayerAutosuggest
              suggestions={this.state.players}
              id="player2"
              label="Player 2"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.closeDialog}>
              Cancel
            </Button>
            <Button onClick={this.beginGame} color="primary">
              Begin
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
