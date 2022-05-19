import React from 'react';
import '@styles/NotFound.scss';

const NotFound = () => {
    return (
        <div className="NotFound">
            <div className="container">
                <div className="error">
                    <p className="errorMessage">Error <span>404</span></p>
                </div>
                <h1 className="title">Ooops!!!</h1>
                <p className="subtitle">La pagina que buscas, no se encuentra o esta en mantenimiento.</p>
                <button className="primary-button back-button">Volver</button>
            </div>
        </div>
    );
}

export default NotFound;