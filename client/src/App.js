import React, { Component } from 'react';
import { css } from 'emotion';
import 'typeface-roboto';

import Grid from 'material-ui/Grid';
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

    // need to fetch this from some API
    const gameInProgress = false
    let activeGameOrPlayerQueue = null
    if (gameInProgress) {
      activeGameOrPlayerQueue = <ActiveGame styles={styles} />
    } else {
      activeGameOrPlayerQueue = <PlayerQueue styles={styles} />
    }

    return (
      <div className={styles.root}>
        <PoolcamAppBar styles={styles} />
        <div className={css`padding: 0px 10px;`}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            { activeGameOrPlayerQueue }
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
