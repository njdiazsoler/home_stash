import React from 'react';
import injectStyle from 'react-jss';

const SideBar = (props) => {
  const { classes } = props
  return (
    <div>
      <div>
        <h2>Overview</h2>
      </div>
      <div>
        <ul className={classes.navList}>
          <li>
            <h3>Kitchen</h3>
          </li>
          <li>
            <h3>Bathroom</h3>
          </li>
        </ul>
      </div>
    </div>

  )
}

const styles = {
  navList: {
    listStyleType: 'none',
  },

}

export default injectStyle(styles)(SideBar);