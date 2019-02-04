import React, { Component } from 'react';
import Home from './client/admin/screens/HomeOverview';
import './App.css';
import injectStyle from 'react-jss';
import SideBar from './client/admin/components/SideBar';
import { Route, Switch } from "react-router-dom";
import StashOverview from './client/admin/components/StashOverview';

class App extends Component {
  constructor(props) {
    super(props),
    this.state = {
      isLoading: true,
    }
  }
  render() {
    const { classes } = this.props
    return (
      <div className="App">
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
      </div>
    );
  }
}
componentDidMount = () => {

}

const handleRoute = ({ match }) => {
  const stashData = [
    {
      name: 'kitchen',
      createdById: 1,
      items: [
        { id: 1, name: 'Detergent', quantity: 2, quantityType: 'units', estimatedDurability: '2019-02-04', purchaseDate: '2019-01-20' },
        { id: 2, name: 'Oven Cleaner', quantity: 2, quantityType: 'units', estimatedDurability: '2019-02-20', purchaseDate: '2019-01-20' },
      ],
      creationDate: '2019-01-28'
    },
    {
      name: 'bathroom',
      createdById: 1,
      items: [],
      creationDate: '2019-01-28'
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
    height: '100%'
  },
  sideBarContainer: {
    alignItems: 'center',
    backgroundColor: '#BE8629',
    color: 'white',
    display: 'flex',
    flexFlow: 'column',
    width: '13%'
  },
}

export default injectStyle(styles)(App);
