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
            <SideBarLink path="/kitchen" text='Kitchen' />
          </li>
          <li>
            <SideBarLink path="/bathroom" text='Bathroom' />
          </li>
        </ul>
      </nav>
      <Link to='/'>
        <Button>
          Home
      </Button>
      </Link>
    </div>

  )
}

const styles = {
  navList: {
    listStyleType: 'none',
    paddingInlineStart: '0',
  },
}

export default injectStyle(styles)(SideBar);