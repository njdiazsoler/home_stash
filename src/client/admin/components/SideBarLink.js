import React from 'react';
import injectStyle from 'react-jss'
import { Link } from 'react-router-dom';

const SideBarLink = props => {
  return (
    <Link className={props.classes.noFormat} to={{pathname: props.path, state: props.data}} >{props.text}</Link>
  )
}

const styles = {
  noFormat: {
    textDecoration: 'none!important',
    color: 'white',
  },'&:hover': {
    color: 'white!important',
  },
}

export default injectStyle(styles)(SideBarLink);