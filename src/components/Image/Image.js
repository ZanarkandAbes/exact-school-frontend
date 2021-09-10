import React from 'react'

const Image = props => {

  return (
    <div>
      <img src={props.image} alt="Imagem" height={50} width={50} />
    </div>
  )
}

export default Image