import React from 'react'
import '../styles/NotFound.scss'


const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-info">
        <h1 className="not-found-title">Error 404, no se encontró lo que estas buscando</h1>
        <h2>La página no funciona</h2>
        <button className="primary-button">Ir a Home</button>
      </div>
    </div>
  )
}

export default NotFound