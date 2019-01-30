import React from 'react';
import injectStyle from 'react-jss';
import { Button } from 'react-bootstrap';
import Title from '../components/Title';
import sequelize from '../../../config/db'

const Home = (props) => {

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const { classes } = props;
  return (
    <div className={classes.homeContainer}>
      {props.data.map(stash => {
        return (
          <div key={stash.name}>
            <Title onClick='#'>{stash.name}</Title>
            <p>{stash.creationDate}</p>
          </div>)
      })}
      <div>
        <Button variant='primary'>Test</Button>
      </div>
    </div>
  )
}

const styles = {
  homeContainer: {
    textAlign: 'center',
  },
}

export default injectStyle(styles)(Home);