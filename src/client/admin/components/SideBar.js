import React from 'react';
import injectStyle from 'react-jss';
import SideBarLink from './SideBarLink';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const SideBar = (props) => {

  const { classes } = props
  return (
    <div>
      <h2>Overview</h2>
      <nav>
        <ul className={classes.navList}>
          <li>
            <Button style={{ width: '100%' }} variant='secondary' onClick={props.onClick}>
              <SideBarLink path="/kitchen" text='Kitchen' />
            </Button>
          </li>
          <li>
            <Button onClick={props.onClick} variant='secondary'>
              <SideBarLink path="/bathroom" text='Bathroom' />
            </Button>
          </li>
        </ul>
      </nav>
      <Link to='/home'>
        <Button variant='info' onClick={props.onClick}>
          Home
      </Button>
      </Link>
    </div>
  )
}

const styles = {
  navList: {
    display: 'block',
    listStyleType: 'none',
    padding: ' 10px 50px',
  },
}

export default injectStyle(styles)(SideBar);