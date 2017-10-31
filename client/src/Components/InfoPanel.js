import React, { Component } from 'react';
import { css } from 'react-emotion';
import 'whatwg-fetch';
import Leaderboard from './Leaderboard';

const Profile = () =>
  <div className={css`
  width: 200px;
  height: 200px;
  background: orange;
`}></div>

const infoPanel = css`
  width: 100%;
  background: lightsalmon;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
`

class InfoPanel extends Component {
  render() {
    return (
      <div className={infoPanel}>
        <Profile />
        <Leaderboard players={[{ name: "Nick Larew", wins: 10, losses: 8 }, { name: "Nick Larew", wins: 10, losses: 8 }]} />
      </div>
    );
  }
}

export default InfoPanel;
