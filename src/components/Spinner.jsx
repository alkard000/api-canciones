import React, {Fragment} from 'react';
import './Spinner.css';

const Spinner = () => {
    return (  
        <Fragment>        
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
            <p className="container text-center text-spinner">Buscando Letras</p>
        </Fragment>
    );
}
 
export default Spinner;