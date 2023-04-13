function MoviesTask({ movie }) {
  return (
    <div>
      <li key={movie.id} className="movie">
        <h3>{movie.title}</h3>
        <h3>{movie.year}</h3>
        <img src={movie.poster} alt={movie.Title} />
      </li>
    </div>
  );
}

export default MoviesTask;
