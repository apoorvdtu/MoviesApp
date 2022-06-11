import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'
import Pagination from './Pagination';
function Movies() {
    let [movies, setMovies] = React.useState([]);
    let [pageNumber, setPage] = useState(1);
    let [hover, setHover] = useState('');
    let [favourites, setFavourites] = useState([]);
    let goAhead = () => {
        setPage(pageNumber + 1);
    }
    let goBefore = () => {
        if (pageNumber > 1)
            setPage(pageNumber - 1);
    }
    let add = (movie) => {
        let newArray = [...favourites, movie];
        setFavourites([...newArray]);
        localStorage.setItem('MoviesApp', JSON.stringify(newArray));
    }
    let remove = (movie) => {
        let findidx = favourites.findIndex((m) => {
            return m.id == movie.id;
        })

        let newArray = [...favourites];
        newArray.splice(findidx, 1);
        setFavourites([...newArray]);
        localStorage.setItem('MoviesApp', JSON.stringify(newArray));
    }
    useEffect(() => {


        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=9b6d8b8825f1ea1905959c49897e4395&page=${pageNumber}`)
            .then((res) => {
                // res.data.results
                setMovies(res.data.results)
                let storedFav = localStorage.getItem('MoviesApp');
                if (!storedFav)
                    setFavourites([...JSON.parse(storedFav)]);


            });
    }, [pageNumber]);

    return (
        <div>
            <div className='flex flex-col justify-center'>
                <div className='mt-8 font-bold text-2xl text-center'> Trending Movies</div>
                <div className='mb-8 flex flex-wrap justify-center'>
                    <div>
                        {movies.length == 0 ? <TailSpin color="green" height={100} width={150} />
                            :
                            <div className='flex  flex-wrap justify-center'>
                                {
                                    movies.map((movie) => {
                                        return <>


                                            <div className={`md:h-[30vh] md:w-[250px] h-[25vh] w-[150px] 
                                            bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] justify-center bg-cover bg-center rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 relative`} onMouseOver={() => setHover(movie.id)} onMouseLeave={() => setHover('')}>
                                                {
                                                    hover == movie.id ?
                                                        <>
                                                            {
                                                                !favourites.find((m) => {
                                                                    return m.id == movie.id
                                                                }) ? <div className='cursor-pointer absolute top-2 right-2 p-2 bg-gray-800 text-xl rounded-xl' onClick={() => { add(movie) }}>🤩</div> : <div className='cursor-pointer absolute top-2 right-2 p-2 bg-gray-800 text-xl rounded-xl' onClick={() => { remove(movie) }}>🙅🏻‍♂️</div>
                                                            }</>
                                                        : <></>
                                                }
                                                <div className='text-bold w-full rounded-b-xl text-white py-2 bg-gray-900  w-full mx-auto flex justify-center'>{movie.title}
                                                </div>
                                            </div>
                                        </>
                                    })

                                }
                            </div>




                        }
                    </div>

                </div>
            </div>
            {/* // [url${logo}] */}
            <Pagination pageNumber={pageNumber} goBefore={goBefore} goAhead={goAhead}></Pagination>

        </div>
    )
}

export default Movies
