import React, { Component } from 'react';
import Home from './client/admin/screens/HomeOverview';
import './App.css';
import { Row } from 'react-bootstrap';
import injectStyle from 'react-jss';
import SideBar from './client/admin/components/SideBar';
import { Route, Switch } from "react-router-dom";
import StashOverview from './client/admin/components/StashOverview';


class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className="App">
        <Row>
          <div className={classes.sideBarContainer}>
              <SideBar />
          </div>
          <div className={classes.contentContainer}>
            <Switch>
              <Route exact path='/' component={handleRoute} />
              <Route exact path='/home' component={handleRoute} />
              <Route path='/:id' component={handleRoute} />
            </Switch>
          </div>
        </Row>
      </div>
    );
  }
}

const handleRoute = ({ match }) => {
  const stashData = [
    {
      name: 'kitchen',
      createdById: 1,
      items: [
        { id: 1, name: 'Detergent', durability: 1209600000, purchaseDate: '2019-01-20 13:00:00-0300' },
        { id: 2, name: 'Oven Cleaner', durability: 2592000000, purchaseDate: '2019-01-20 13:00:00-0300' },
      ],
      creationDate: '2019-01-28 00:00:00-0300'
    },
    {
      name: 'bathroom',
      createdById: 1,
      items: [],
      creationDate: '2019-01-28 00:00:00-0300'
    },
  ]
  if (match.url !== '/') {
    let curStash = {};
    stashData.forEach(function (stash) {
      if (stash.name === match.params.id) {
        curStash = stash;
      }
    })
    return <StashOverview data={curStash} />
  } else {
    return <Home data={stashData} />
  }
}

const styles = {
  contentContainer: {
    backgroundColor: 'white',
    display: 'flex',
    width: '85%',
  },
  sideBarContainer: {
    alignItems: 'center',
    backgroundColor: '#BE8629',
    color: 'white',
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
    width: '13%'
  },
}

export default injectStyle(styles)(App);
