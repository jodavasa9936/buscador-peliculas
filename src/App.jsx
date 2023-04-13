import "./App.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { useMovies } from "./hooks/useMovies.js";
import { Movies } from "./components/Movies.jsx";
import debounce from "just-debounce-it";
/* recuerda instalar debounce npm install just-debounce-it -E */

/* aqui importamos la carpeta completa Movies.jsx */
function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);
  /* el usuario no ha ingresado y ya estamos diciendole 
  "no se puede buscar una pelicula vacia" sin haber 
  buscado alguna, por ende debemos para eso usamos 
  igualmente el useRef() */

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search == "";
      return;
    }
    /*  si es el primer input el usuario vamos a cambviar 
    su valor en el caso de que el search  sea igual a 
    string vacio  */

    if (search == "") {
      setError("no se puede buscar una pelicula vacia");
      return;
      /* el return evita que se siga ejecutando */
    }
    if (search.match(/^\d+$/)) {
      setError("No se puede hacer una pelicula con numero");
      return;
    }
    if (search.length < 3) {
      setError("la pelicula debe ser mayor a 3 letras");
      return;
    }
    setError(null);
  }, [search]);
  /* cada vez que cambia el search que es lo que ocurre */
  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  /* para clasificar las peliculas por año usamos sort */
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });
  /*de esta manera pasamos los datos como props a useMovies*/
const debouncedGetMovies = useCallback(debounce(search => {
console.log('search',{search})
getMovies({search});
}, 2000)
, [getMovies]
)
  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
    /*  aqui estamos pasando el parametro al async de getMovie */
    /*  sin getMovies() no se genera la busqueda */
  };
  const handleSort = () => {
    setSort(!sort);
    /* el valor inicial es falso, aqui se convierte en verdader */
  };
  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  /*este codigo no debe renderizarse
  cada vez que recibe un valor el getMovies*/

  return (
    <div>
      <header>
        <h1>Buscador de peliculas</h1>

        <form claassName="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            name="search"
            placeholder="avengers, star wars, the matrix"
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>
      <main>
        {loading ? <p> Cargando...</p> : <Movies movies={movies} />}
        {/*si hace loading esta cargando, si no, muestra as peliculas 
        decimos que es false=0 es decir, como setLoading(false) especificamos 
        que la pagina no funciona.*/}
        {/* aqui estamos pasando los datos de la funcion useMovies
        const { movies } = useMovies(); */}
      </main>
    </div>
  );
}

export default App;
