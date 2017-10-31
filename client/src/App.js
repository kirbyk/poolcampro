import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';

class App extends Component {
  constructor(props) {
    super(props);
  }


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
        <AppBar position="static">
          <Toolbar>
            <IconButton className={styles.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={styles.flex}>
              PoolCam Pro 🎱
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>

            <Button raised color="primary" className={styles.button}>
              Begin Game
            </Button>

          </Grid>
          <Grid item xs={12} sm={6}>

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

          </Grid>
        </Grid>



      </div>
    );
  }
}
export default App;
