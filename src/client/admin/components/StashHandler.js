import React from 'react';
import { Row, Col } from 'react-bootstrap';

const StashHander = (props) => {
  console.log(props.data)
  return (
    <div>
      {props.data.map(stash => {
        return (<div key={stash.id}>
          <h1>{stash.name}</h1>
          <p>{stash.creationDate}</p>
        </div>)
      })}
    </div>
  )
}

export default StashHander;