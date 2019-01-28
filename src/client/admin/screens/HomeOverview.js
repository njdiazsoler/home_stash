import React from 'react';
import injectStyle from 'react-jss';
import StashHandler from '../components/StashHandler';

const Home = (props) => {
  const stashData = [
    { name: 'Kitchen', createdById: 1, items: [], creationDate: '2019-01-28 00:00:00-0300' },
    { name: 'Bathroom', createdById: 1, items: [], creationDate: '2019-01-28 00:00:00-0300' },
  ]
  const { classes } = props;

  return (
    <div className={classes.homeContainer}>
      <StashHandler data={stashData} />
    </div>
  )
}

const styles = {
  homeContainer: {
    height: '100%',
  },
}

export default injectStyle(styles)(Home);