import React from 'react';
import { css } from 'react-emotion';

const ButtonStyle = css`
  background: #000;
  width: 150px;
  color: white;
  padding: 10px 10px 10px 10px;
`
const Button = (props) =>
  <button className={ButtonStyle} onClick={props.onClick}>
    {props.children}
  </button>

export default Button