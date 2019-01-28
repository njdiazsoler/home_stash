import React from 'react';
import Title from '../components/Title';

const StashHander = (props) => {
  return (
    <div>
      {props.data.map(stash => {
        return (<div key={stash.id}>
          <Title onClick='#'>{stash.name}</Title>
          <p>{stash.creationDate}</p>
        </div>)
      })}
    </div>
  )
}

export default StashHander;