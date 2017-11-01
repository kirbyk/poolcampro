import React, { Component } from 'react';
import { css } from 'react-emotion';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import PersonIcon from 'material-ui-icons/Person';
import CancelIcon from 'material-ui-icons/Cancel';

const me = { _id: 7, name: "Nick Larew", wins: "10", losses: "8" }

const leaveButton = css`
  font-weight: bold;
  padding: 5px 0px 0px 0px;
  cursor: pointer;
`
const LeaveButton = (props) => 
<a className={leaveButton}
   onClick={props.hidden ? null : () => props.onClick()}
>
  <div className={css`width: 30px;`}>
    { !props.hidden
      ? <Tooltip id="tooltip-cancel" title="Leave the Queue" placement="top">
          <CancelIcon />
        </Tooltip>
      : ""
    }
  </div>
</a>

const playerQueueItem = css`
  flex-grow: 3;
  max-width: 300px;
`
const PlayerQueueItem = (props) =>
<div className={playerQueueItem}>
  <ListItem>
    <Avatar>
      <PersonIcon />
    </Avatar>
    <ListItemText
      primary={ props.player.name }
    />
    <LeaveButton onClick={() => props.remove(props.player)} hidden={props.player._id !== me._id} />
  </ListItem>
</div>

class PlayerQueue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queue: [
        { _id: 1, name: "Dev Ittycheria", wins: 42, losses: 0 },
        { _id: 2, name: "Kay Kim", wins: 42, losses: 0 },
        // { _id: 3, name: "Shannon Bradshaw", wins: 42, losses: 0 },
        // { _id: 4, name: "Niyati Shah", wins: 42, losses: 0 },
        // { _id: 5, name: "Andrew Aldridge", wins: 42, losses: 0 },
        // { _id: 6, name: "Jon DeStefano", wins: 42, losses: 0 },
        // { _id: 7, name: "Nick Larew", wins: "10", losses: "8" },
        { _id: 8, name: "Rhys Howell", wins: 42, losses: 0 },
        { _id: 9, name: "Kirby Kohlmorgen", wins: "30", losses: "4" },
        { _id: 10, name: "Daniel Coupal", wins: 42, losses: 0 },
        { _id: 11, name: "Rob Justice", wins: 42, losses: 0 },
        { _id: 12, name: "Tony Sansone", wins: 42, losses: 0 },
        { _id: 13, name: "Norberto Leite", wins: 42, losses: 0 },
      ]
    }
  }

  renderPlayersInQueue() {
    let queueItemContainer = css`
      display: flex;
      flex-direction: row;
    `
    let Spacer = () => <div className={css`flex-grow: 1;`} />
    return (
      <div className={css`overflow-y: scroll;`}>
      <List>
      {
        this.state.queue.map(p => 
          <div className={css`width: 100%;`} key={p.name}>
            <div className={queueItemContainer}>
              <Spacer />
              <PlayerQueueItem
                player={p}
                remove={p => this.removePlayerFromQueue(p)}
              />
              <Spacer />
            </div>          
            <Divider />
          </div>          
        )
      }
      </List>
      </div>
    )
  }

  addPlayerToQueue(player) {
    let queue = this.state.queue
    if (!queue.includes(player)) {
      queue.push(player)
      this.setState({ queue: queue })
    }
  }

  removePlayerFromQueue(player) {
    let queue = this.state.queue.filter(
      p => p.name !== player.name
    )
    this.setState({ queue: queue })
  }

  render() {
    let userIsInQueue = this.state.queue.filter(p => p._id === me._id).length > 0
    return (
      <div className={css`flex-grow: 1`}>
      <Typography type="title" className={css`
        padding: 10px;
      `}>
        Game Queue
      </Typography>
      <div className={css`
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
      `}>
        <Divider />
        {this.renderPlayersInQueue()}
        {
          <div>
            <div className={css`
              height: 35px;
              padding: 5px 0;
            `}>
              <Button
                raised
                color={!userIsInQueue ? "primary" : "secondary"}
                className={this.props.styles.button}
                onClick={() => this.addPlayerToQueue(me)}
              >
                Add Yourself to the Queue
              </Button>
            </div>
          </div>
        }
        </div>
      </div>
    )
  }
}
export default PlayerQueue
