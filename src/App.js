import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';

import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';
import Error from './components/Error';
import Spinner from './components/Spinner';

function App() {

  //DEFINIR EL STATE
  const [busquedaletra, setBusquedaletra] = useState({});
  const [informacion, setInformacion] = useState({});
  const [letra, setLetra] = useState('');
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if(Object.keys(busquedaletra).length === 0) return ;

    const consultarAPILetra = async () => {

      const {artista, cancion} = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      await Promise.all([axios(url), axios(url2)])
        .then((values) => {
          const letraC = values[0];
          const informacionA = values[1];

          setCargando(true);
          setTimeout(() => {
            //CAMBIAR ESTADO
              setLetra(letraC.data.lyrics);
              setInformacion(informacionA.data.artists[0]); 
              setError(false);
              setCargando(false);
          }, 5000);
        })
        .catch((err) => {
          setError(true);
          return;
        })
      // setLetra(res);
    }
    consultarAPILetra();
  }, [busquedaletra]);

  const informacionArtista = (cargando) ? <Spinner/> :       
    <div className="container mt-5">
      {error ? <Error mensaje="Cancion o Grupo no encontrados"/> : 
        <div className="row">
            <div className="col-md-6">
              <Info informacion={informacion}/>
            </div>
            <div className="col-md-6">
              <Cancion letra={letra} />
            </div>
        </div>
      }
    </div>
  
  return (
    <Fragment>
      <Formulario
        setBusquedaletra={setBusquedaletra}
      />
      {informacionArtista}
    </Fragment>
  );
}

export default App;
