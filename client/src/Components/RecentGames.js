import React from 'react';
import Typography from 'material-ui/Typography';
import List, { ListItem, /*ListItemIcon,*/ ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

import { css } from 'react-emotion';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import PersonIcon from 'material-ui-icons/Person';

const games = [{
  _id: 12345,
  startTime: new Date("October 30, 2017 11:10:00"),
  endTime: new Date("October 30, 2017 11:20:21"),
  players: [
    {
      name: "Nick Larew",
      elo: 1150,
      expectedScore: 0.322,
      actualScore: 1,
      newElo: 1161
    },
    {
      name: "Kirby Kohlmorgen",
      elo: 1300,
      expectedScore: 0.678,
      actualScore: 0,
      newElo: 1265
    }
  ]
},
  {
    _id: 12345,
    startTime: new Date("October 30, 2017 11:10:00"),
    endTime: new Date("October 30, 2017 11:20:21"),
    players: [
      {
        name: "Nick Larew",
        elo: 1150,
        expectedScore: 0.322,
        actualScore: 1,
        newElo: 1161
      },
      {
        name: "Kirby Kohlmorgen",
        elo: 1300,
        expectedScore: 0.678,
        actualScore: 0,
        newElo: 1265
      }
    ]
  }]

const RecentGame = (props) => {
  let game = props.game;
  let winner = props.game.players.filter(p => p.actualScore == 1)[0]
  let loser = props.game.players.filter(p => p.actualScore == 0)[0]

  const timeSinceGame = (endTime) => {
    let timeSince = (new Date() - props.game.endTime) / 1000 / 60
    let units = "minutes"

    if (timeSince > 59 && timeSince < 1440) {
      timeSince = timeSince / 60;
      units = timeSince >= 2 ? "hours" : "hour"
    }
    if (timeSince >= 1440) {
      timeSince = timeSince / 60 / 24;
      units = timeSince >= 2 ? "days" : "day"
    }
    return `${Math.floor(timeSince)} ${units} ago`
  }
  
  return <div className={css`
    flex-grow: 3;
    max-width: 300px;
  `}>
    <ListItem>
      <ListItemText
        primary={ `${winner.name} vs ${loser.name}`}
        secondary={ timeSinceGame(game.endTime) }
      />
    </ListItem>
  </div>
}

const renderRecentGames = (finishedGames) =>
  finishedGames.map(g => <RecentGame game={g}/>)

const RecentGames = (props) =>
<div className={css`
  height: 220px;
`}>
<Typography type="title" className={css`
  padding: 10px 10px 0px 10px;
`}>
  Recent Games
  <Button raised color={"primary"} className={css`
    margin: 0 0 0 10px;
  `}>
    View All Games
  </Button>
</Typography>
<List>
  <Divider />
  {renderRecentGames(games)}
</List>
</div>

export default RecentGames