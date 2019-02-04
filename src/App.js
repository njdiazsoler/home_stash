import React, { Component } from 'react';
import Home from './client/admin/screens/HomeOverview';
import './App.css';
import injectStyle from 'react-jss';
import SideBar from './client/admin/components/SideBar';
import { Route, Switch } from "react-router-dom";
import StashOverview from './client/admin/components/StashOverview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 2000)
  }
  
  handleClick = () => {
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 2000)
    this.setState({ isLoading: true })
  }

  render() {
    const { classes } = this.props
    return (
      <div className="App">
          <div className={classes.sideBarContainer}>
              <SideBar onClick={this.handleClick} />
          </div>
          <div className={classes.contentContainer}>
            <h1>Home Stash</h1>
            {this.state.isLoading ?
            <div className={classes.loaderContainer}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif' alt='loading...'/>
            </div>:
            <Switch>
              <Route exact path='/' component={handleRoute} />
              <Route exact path='/home' component={handleRoute} />
              <Route path='/:id' component={handleRoute} />
            </Switch>
            }
          </div>
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
  if (match.url !== '/home' && match.url !== '/') {
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
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    width: '85%',
  },
  loaderContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '50%',
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
