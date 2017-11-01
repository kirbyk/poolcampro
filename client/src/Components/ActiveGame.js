import React from 'react';
import Button from 'material-ui/Button';
import { css } from 'emotion';


const ActiveGame = (props) =>
<div className={css`
  width: 100%;
  height: 220px;
`}>
<Button raised color="primary" className={props.styles.button}>
  Begin Game
</Button>
</div>

export default ActiveGame
