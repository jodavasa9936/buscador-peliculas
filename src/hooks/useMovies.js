import {useState, useRef, useMemo, useCallback } from 'react'
import {searchMovies} from '../services/movies.js'

export function useMovies ({search, sort}) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)
/*     en este caso usaremos useRef para guardar 
    el dato anterior previusSearch y no se pueda ejecutar la 
    misma busqueda dos veces. */

    const getMovies = useCallback(
         async ({search}) => {
    if (search == previousSearch.current) return 

   /*  este search en lugar de depender del search que viene como prop 
    vamos a depender del que se pasa por parametro*/
   /*  si el valor previousSearch.current es igual a search,
    la uncion termina  */

try {
setLoading(true)
setError(null)
previousSearch.current = search
const newMovies = await searchMovies({search})
setMovies(newMovies)

}  catch(e) { 
setError(e.message)
}finally {
//esto se ejecuta tanto en el try como el catch
setLoading(false)



}
}, [])
/* esta funcion (getMovies) siempre se esta destruyendo y creando
podemos verificarlo creando un useEffect en App.jsx */
/*si dentro de loas casillas [] hubiese un search se renderizaria
el getMovies con cada valor que se introduce en el search  */ 


/* const getSortedMovies = () => {
    console.log('getSortedMovies')
const sortedMovies = sort
? [...movies].sort((a,b) => a.title.localeCompare(b.title))
: movies

return sortedMovies
} */
{/* el sort compara entre a y b y utilizaremos el titulo de cada
uno */
/* y si  no esta activado muestra normal las peliculas  */}
const sortedMovies = useMemo(()=>{
console.log('memoSortedMovies')

    return sort
? [...movies].sort((a,b) => a.title.localeCompare(b.title))
: movies
}, [sort, movies])
/* cuando cambie el sort(cambian de orden las peliculas) 
o las peliculas se vuelvan a buscar entonces se recalcula la
sortedMovies*/
/* como en el useEffect aqui van las dependencias */
/* con el useMemo evitamos que se este renderizando el input cada vez
que ingresamos un valor  lo podemos ver en console.log('memoSortedMovies')*/


return {movies: sortedMovies, getMovies, loading}
/* movies es la coleccion de peliculas y getSortedMovies puede
ir vacio.  */
}

/* si quisieramos hacerlo asi es una mala practica 

let previusSearch = search

if (search == previusSearch) return 

previusSearch = search  */