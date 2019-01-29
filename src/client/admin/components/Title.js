import React from 'react';

const Title = (props) => {
  return(
    <div>
      <h1 style={props.style}>{props.children}</h1>
    </div>
  )
}

export default Title;