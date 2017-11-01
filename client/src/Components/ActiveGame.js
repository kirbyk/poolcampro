import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { css } from 'react-emotion';



const ActiveGame = (props) =>
<Paper className={css`
  text-align: center;
  line-height: 200px;
  height: 280px;
  margin: 10px 0px;
`}>
<Button raised color="primary" className={props.styles.button}>
  Begin Game
</Button>
</Paper>

export default ActiveGame