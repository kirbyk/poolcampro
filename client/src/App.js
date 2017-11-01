import React, { Component } from 'react';
import { css } from 'emotion';
// import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';
import 'typeface-roboto';
// import Button from 'material-ui/Button';

import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
// import InboxIcon from 'material-ui-icons/Inbox';
// import DraftsIcon from 'material-ui-icons/Drafts';
import PoolcamAppBar from "./Components/PoolcamAppBar";
import RecentGames from './Components/RecentGames';
import ActiveGame from './Components/ActiveGame';

import PlayerQueue from './Components/PlayerQueue';

class App extends Component {
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

    return (
      <div className={styles.root}>
        <PoolcamAppBar styles={styles} />
        <div className={css`padding: 0px 10px;`}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <ActiveGame styles={styles}/>
            <PlayerQueue styles={styles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RecentGames />
          </Grid>
        </Grid>
        </div>



      </div>
    );
  }
}
export default App;
