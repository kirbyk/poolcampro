import React from 'react';
import Typography from 'material-ui/Typography';
import List, { ListItem, /*ListItemIcon,*/ ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';

import { css } from 'react-emotion';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import PersonIcon from 'material-ui-icons/Person';

const games = [{
  _id: 12345,
  startTime: new Date("October 31, 2017 11:10:00"),
  endTime: new Date("October 31, 2017 11:20:21"),
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
  let winner = props.game.players.filter(p => p.actualScore == 1)[0]
  let loser = props.game.players.filter(p => p.actualScore == 0)[0]
  
  return <div className={css`
    flex-grow: 3;
    max-width: 300px;
  `}>
    <ListItem>
      <ListItemText
        primary={ `${winner.name} vs ${loser.name}`}
        secondary={ "23 minutes ago" }
      />
    </ListItem>
  </div>
}

const renderRecentGames = (finishedGames) =>
  finishedGames.map(g => <RecentGame game={g}/>)

const RecentGames = (props) =>
<div className={css`

`}>
<Typography type="subheading">
  Recent Games
</Typography>
<List>
  {renderRecentGames(games)}
  <ListItem>
    <Button raised color={"primary"}>
      View All Games
    </Button>
  </ListItem>
</List>
</div>

export default RecentGames