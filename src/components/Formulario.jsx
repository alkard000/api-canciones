import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Error from './Error';

const Formulario = ({setBusquedaletra}) => {

    const [busqueda, setBusqueda] = useState({
        artista : '',
        cancion : ''
    });
    const [error, setError] = useState(false);

    const {artista, cancion} = busqueda;

    //FUNCION PARA CADA INPUT Y LEER SU CONTENIDO
    const actualizarState = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    //CONSULTAR LAS APIS
    const buscarInfo = e => {
        e.preventDefault();

        if(artista.trim() === '' || cancion.trim() === ''){
            setError(true);
            return;
        }

        //"TODO" BIEN, PASAR AL COMPONENTE PRINCIPAL
        setError(false);
        setBusquedaletra(busqueda);
    }
    

    return (  
        <div className="bg-info">
            <div className="container">
                {error ? <Error mensaje="Los Campos son abligatorios"/> : null}
                <div className="row">
                    <form
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                        onSubmit={buscarInfo}
                    >
                        <fieldset>
                            <legend className="text-center">Buscador Letras de canciones</legend>
                        
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre Artista"
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Cancion</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre Cancion"
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary float-right"
                            >
                                Buscar
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}

Formulario.propTypes = {
    setBusquedaletra : PropTypes.func.isRequired
}
 
export default Formulario;