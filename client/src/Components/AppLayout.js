import React from 'react';
import { css } from 'react-emotion';
import ControlPanel from './ControlPanel';
import InfoPanel from './InfoPanel';

const Navbar = () =>
<div className={css`
  height: 50px;
  width: 100vw;
  background-color: blue;
  display: block;
`} />

const Content = (props) =>
<div className={css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`}>{props.children}</div>

const appLayout = css`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const AppLayout = (props) =>
  <div className={appLayout}>
    <Navbar />
    <Content>
      <ControlPanel logout={() => props.logout()} />
      <InfoPanel />
    </Content>
  </div>


export default AppLayout
