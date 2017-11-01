import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';


const PoolcamAppBar = (props) =>
<AppBar position="static">
  <Toolbar>
    <IconButton
      className={props.styles.menuButton}
      color="contrast"
      aria-label="Menu"
      onClick={props.toggleDrawer(true)}
    >
      <MenuIcon />
    </IconButton>
    <Typography type="title" color="inherit" className={props.styles.flex}>
      PoolCam Pro <span role="img" aria-label="8 ball">🎱</span>
    </Typography>
  </Toolbar>
</AppBar>

export default PoolcamAppBar
