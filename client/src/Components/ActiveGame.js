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


export default class ActiveGame extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button raised color="primary" onClick={this.handleClickOpen}>Start New Game</Button>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>New Game</DialogTitle>

          <DialogContent>
            <DialogContentText>
              To start a new game enter your name and your opponent's name and
              click begin.
            </DialogContentText>

            <PlayerAutosuggest />

            <TextField
              autoFocus
              margin="dense"
              id="player1"
              label="Player 1"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="player2"
              label="Player 2"
              type="text"
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleRequestClose}>
              Cancel
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              Begin
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
