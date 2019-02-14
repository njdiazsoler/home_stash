import React from 'react';

const Title = (props) => {
  return(
    <div className={props.className}>
      <h1 style={props.style}>{props.children}</h1>
    </div>
  )
}

export default Title;