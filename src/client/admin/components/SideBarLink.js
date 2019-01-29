import React from 'react';
import { Link } from 'react-router-dom';

const SideBarLink = props => {
  return (
    <Link to={props.path}>{props.text}</Link>
  )
}

export default SideBarLink;