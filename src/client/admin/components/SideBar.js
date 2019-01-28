import React from 'react';
import injectStyle from 'react-jss';
import { BrowserRouter as Router, Link } from "react-router-dom";


const SideBar = (props) => {
  const { classes } = props
  return (
    <Router>
      <div>
        <div>
          <h2>Overview</h2>
        </div>
        <div>
          <ul className={classes.navList}>
            <li>
              <Link to="/kitchen/">Kitchen</Link>
            </li>
            <li>
              <Link to="/bathroom/">Bathroom</Link>
            </li>
          </ul>
        </div>
      </div>
    </Router>

  )
}

const styles = {
  navList: {
    listStyleType: 'none',
  },

}

export default injectStyle(styles)(SideBar);