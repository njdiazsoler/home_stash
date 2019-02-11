import React from 'react';
import injectStyle from 'react-jss';
import SideBarLink from './SideBarLink';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const SideBar = (props) => {
  let data = ['kitchen', 'bathroom', 'Store Room', 'Bedroom']
  const { classes } = props;
  return (
    <div>
      <h2>Overview</h2>
      <nav>
        <ul className={classes.navList}>
          {data ?
            data.map(function(data) 
            { return (<li key={data} className={classes.buttonMargin}>
              <Button style={{ width: '100%', textTransform: 'capitalize' }} variant='secondary' onClick={props.onClick}>
                <SideBarLink path={`/home/${data}`} text={data} data={data}/>
              </Button>
            </li>)}) :
            null}
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
  buttonMargin: {
    marginBottom: '1vh',
  },
  navList: {
    display: 'block',
    listStyleType: 'none',
    padding: ' 10px 50px',
  },
}

export default injectStyle(styles)(SideBar);