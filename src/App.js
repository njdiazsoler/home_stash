import React, { Component } from 'react';
import Home from './client/admin/screens/HomeOverview';
import './App.css';
import { Row, Col } from 'react-bootstrap';
import injectStyle from 'react-jss';
import SideBar from './client/admin/components/SideBar';
import StashOverview from './client/admin/components/StashOverview';

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className="App">
        <Row>
          <div className={classes.sideBarContainer}>
            <Col xs={2}>
              <SideBar />
            </Col>
          </div>
          <div className={classes.contentContainer}>
            <Col xs={10}>
              <Home />
              {/* <StashOverview data={stashData[0]}/> */}
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

const styles = {
  contentContainer: {
    backgroundColor: 'white',
  },
  sideBarContainer: {
    alignItems: 'center',
    backgroundColor: '#BE8629',
    color: 'white',
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
  },
}

export default injectStyle(styles)(App);
