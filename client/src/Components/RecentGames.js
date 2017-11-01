import React from 'react';
import Typography from 'material-ui/Typography';
import List, { ListItem, /*ListItemIcon,*/ ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';

const RecentGames = () =>
<div>
  <Typography type="title">
    Recent Games
  </Typography>
  <List>
    <ListItem button>
      <ListItemText primary="Jerzy vs Kirby 23 minutes ago" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Dev vs Kirby 1 hour ago" />
    </ListItem>
    <ListItem>
              <Button
                raised
                color={"primary"}
              >
                View All Games
              </Button>
    </ListItem>
  </List>
</div>

export default RecentGames

