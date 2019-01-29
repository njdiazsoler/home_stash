import React from 'react';
import injectStyle from 'react-jss';
import { Button } from 'react-bootstrap';
import Title from '../components/Title';

const Home = (props) => {
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