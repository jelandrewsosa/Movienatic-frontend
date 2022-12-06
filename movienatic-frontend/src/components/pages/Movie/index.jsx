import { useEffect, useState } from "react";
import style from './style.module.css'

// Component
import MovieDetails from '../../MovieDetails'

const Movie = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch('http://localhost:5173/movies')
      const json = await response.json()

      if (response.ok) {
        setMovies(json)
      }
    }

    fetchMovie()
  }, [])

  return (
    <>
      <div className={style.movie}>
          {movies && movies.map((movie) => (
            <MovieDetails  key={movie._id} movie={movie}/>
          ))}
      </div>
    </>

  )
}

export default Movie;