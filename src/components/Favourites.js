
import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
function Favourites() {
    let [currGenre, setCurrGenre] = useState('All Genres')
    let [favourites, setFavourites] = useState([]);
    let [genres, setGeneres] = useState([]);
    let [search, setSearch] = useState('');
    let [rows, setRows] = useState(5);
    let [currPage, setCurrPage] = useState(1);
    let genreids = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
        27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    }


    let [rating, setRating] = useState(0);
    let [popularity, setPopularity] = useState(0);
    let goAhead = () => {
        if (currPage < maxPage)
            setCurrPage(currPage + 1);
    }
    let goBefore = () => {
        if (currPage > 1)
            setCurrPage(currPage - 1);
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
    let filteredMovies = [];
    // filtering
    filteredMovies = currGenre == 'All Genres' ? favourites : favourites.filter((movie) => {
        return genreids[movie.genre_ids[0]] == currGenre;
    })

    // sorting
    if (rating == -1) {
        filteredMovies.sort((a, b) => {
            return a.vote_average - b.vote_average
        });
    }
    else if (rating == 1) {
        filteredMovies.sort((a, b) => {
            return -a.vote_average + b.vote_average
        });
    }
    if (popularity == -1) {
        filteredMovies.sort((a, b) => {
            return a.popularity - b.popularity
        });
    }
    else if (popularity == 1) {
        filteredMovies.sort((a, b) => {
            return -a.popularity + b.popularity
        });
    }
    // searching
    filteredMovies = filteredMovies.filter((movie) => {
        return movie.title.toLowerCase().includes(search.toLowerCase());
    })

    // pagination
    let maxPage = Math.ceil(filteredMovies.length / rows);
    let si = (currPage - 1) * rows;
    let ei = Number(si) + Number(rows);
    filteredMovies = filteredMovies.slice(si, ei);
    //for getting movies from local Storage
    useEffect(() => {

        let storedFav = localStorage.getItem('MoviesApp') || [];
        if (!storedFav)
            setFavourites([...JSON.parse(storedFav)]);


    }, [])
    // for getting generes
    useEffect(() => {
        let temp = favourites.map((movie) => {
            return genreids[movie.genre_ids[0]];
        })
        temp = new Set(temp);
        setGeneres(["All Genres", ...temp]);

    }, [favourites])

    return <>

        <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
            {genres.map((genre) => {
                return <>
                    <button className={
                        currGenre == genre ?
                            'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold' :
                            'm-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'
                    } onClick={() => { setCurrGenre(genre); setCurrPage(1) }}>
                        {genre}
                    </button>
                </>
            })}
        </div>
        <div className='text-center'>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='border border-2 text-center p-1 m-2' />
            <input type="number" value={rows} onChange={(e) =>

                setRows(e.target.value)} placeholder='Rows' className='border border-2 text-center p-1 m-2' />
        </div>

        <div className="flex flex-col m-4">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 min-w-full">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        <div className='flex'>
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer'
                                                onClick={() => {
                                                    setPopularity(0)
                                                    setRating(-1)
                                                }}
                                            />
                                            Rating
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png'
                                                onClick={() => {
                                                    setPopularity(0)
                                                    setRating(1)
                                                }}
                                                className='ml-2 mr-2' />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        <div className='flex'>
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png'
                                                onClick={() => {
                                                    setRating(0)
                                                    setPopularity(-1)
                                                }}
                                                className='mr-2' />
                                            Popularity
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' className='ml-2 mr-2'
                                                onClick={() => {
                                                    setRating(0)
                                                    setPopularity(1)
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Genre
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMovies.map((movie) => (
                                    <tr key={movie.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                                                    <img className="hidden md:block md:h-[100px] md:w-[180px]" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 font-bold">{movie.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{movie.vote_average}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{movie.popularity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {genreids[movie.genre_ids[0]]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                            <button href="#" className="text-red-600 hover:text-red-900"
                                                onClick={() => {
                                                    remove(movie);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {/* <div>Inputs Container</div> */}
        {/* <div>Table Container</div> */}
        {/* <div>Pagination</div> */}
        <div className='mt-4'>

            <Pagination pageNumber={currPage} goBefore={goBefore} goAhead={goAhead} />
        </div>
    </>;
}

export default Favourites;