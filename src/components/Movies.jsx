import MoviesTask from './MoviesTask'

export function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {
        /* mapeamos cada pelicula */
        movies.map((movie) => (
          /* vamos a renderizar para cada pelicula la lista imbID */
          <MoviesTask movie={movie} />
        ))
      }
    </ul>
  );
}

function NoMoviesResults() {
  return <p>No se encontraron peliculas para esta busqueda</p>;
}

export function Movies({ movies }) {
  /*  cuando tenemos peliculas?
  cuando tenemos Search que contiene al array al 
  comienzo del with-results.json y cuando movies tiene 
  length > 0*/
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
}
