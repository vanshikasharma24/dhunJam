import React from 'react'
const Buttoncomponent = (props) => {
  const { buttonText,buttonStyles,onClick} = props;

  return (
    <button className={buttonStyles} onClick={onClick}>{buttonText}</button>
  )
}

export default Buttoncomponent