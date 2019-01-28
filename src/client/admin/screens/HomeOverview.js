import React from 'react';
import injectStyle from 'react-jss';
import { Row, Col } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import StashHandler from '../components/StashHandler';

const Home = (props) => {
  const stashData = [
    { name: 'Kitchen', createdById: 1, items: [], creationDate: '2019-01-28 00:00:00-0300' },
    { name: 'Bathroom', createdById: 1, items: [], creationDate: '2019-01-28 00:00:00-0300' },
  ]
  const { classes } = props;

  return (
    <div>
      <Row>
        <Col xs={2}>
          <SideBar />
        </Col>
        <Col xs={10}>
          <StashHandler data={stashData} />
        </Col>
      </Row>
    </div>
  )
}

export default Home;