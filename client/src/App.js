import React, { Component } from 'react';
import { css } from 'emotion';
import 'typeface-roboto';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import PoolcamAppBar from "./Components/PoolcamAppBar";
import RecentGames from './Components/RecentGames';
import ActiveGame from './Components/ActiveGame';
import Leaderboard from './Components/Leaderboard'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  render() {
    const styles = theme => ({
      root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
      },
      flex: {
        flex: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
      button: {
        margin: theme.spacing.unit,
      },
    });

    const sideList = (
      <List>
        <ListItem button>
          <ListItemText primary="Leaderboard" />
        </ListItem>

        <Divider />

        <ListItem button>
          <ListItemText primary="Recent Games" />
        </ListItem>
      </List>
    );

    return (
      <div className={styles.root}>
        <Drawer open={this.state.drawerOpen} onRequestClose={this.toggleDrawer(false)}>
          <div
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>

        <PoolcamAppBar styles={styles} toggleDrawer={this.toggleDrawer} />

        <div className={css`padding: 5px 10px;`}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <div className={css`
              display: flex;
              flex-direction: column;
              height: 100%;
            `}>
              <ActiveGame styles={styles} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <RecentGames />
            <Leaderboard />
          </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}
export default App;
