import React from 'react';
import injectStyle from 'react-jss';
import SideBar from '../components/SideBar';
import StashHandler from '../components/Stash'

const Home = (props) => {
  const stashData = [
    { name: 'Kitchen', createdById : 1, items: [], creationDate: '2019-01-28 00:00:00-0300' },
    { name: 'Bathroom', createdById : 1, items: [], creationDate: '2019-01-28 00:00:00-0300' },
  ]
  const {classes} = props; 

  return (
    <div>
      <div>
      <SideBar />
      </div>
      <div>
        <StashHandler data={stashData} />
      </div>
      
    </div>
  )
} 

export default Home;