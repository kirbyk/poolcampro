import React from 'react';
import Typography from 'material-ui/Typography';
import List, { ListItem, /*ListItemIcon,*/ ListItemText } from 'material-ui/List';

const RecentGames = () =>
<div>
<Typography type="subheading">
  Recent Games
</Typography>
<List>
  <ListItem button>
    <ListItemText primary="Jerzy vs Kirby 23 minutes ago" />
  </ListItem>
  <ListItem button>
    <ListItemText primary="Dev vs Kirby 1 hour ago" />
  </ListItem>
  <ListItem button>
    <ListItemText primary="All Games"/>
  </ListItem>
</List>
</div>

export default RecentGames