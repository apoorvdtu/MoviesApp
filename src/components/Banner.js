import React, { useEffect } from 'react'
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'
function Banner() {
    let [movie, setMovie] = React.useState(null);

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=9b6d8b8825f1ea1905959c49897e4395')
            .then((res) => {
                // res.data.results
                setMovie(res.data.results[0])

            });
    }, []);
    return (
        <>

            {/* <div className={`h-[40vh] md:[60vh] bg-[url(https://image.tmdb.org/t/p/original//7ucaMpXAmlIM24qZZ8uI9hCY0hm.jpg)] flex items-end justify-center bg-cover bg-center`}>
                <div className='text-3xl text-white p-6 bg-gray-900 bg-opacity-50 w-full mx-auto flex justify-center'>Fantastic Beasts: The Secrets of Dumbledore
                </div>
            </div> */}
            <div>
                <div className='flex flex-col justify-center'>
                    <div className='mb-8 flex flex-wrap justify-center'>
                        <div>
                            {movie == null ? <TailSpin color="green" height={100} width={150} />
                                :
                                <div className=''>
                                    {
                                        <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[50vh] w-[100vw] md:h-[60vh]  bg-center bg-cover flex items-end  `}>
                                            <div className='text-3xl text-white p-6 bg-gray-900 bg-opacity-50 w-full mx-auto flex justify-center'>{movie.title}
                                            </div>
                                        </div>

                                    }
                                </div>




                            }
                        </div>

                    </div>
                </div>
                {/* // [url${logo}] */}

            </div>
        </>
    )
}

export default Banner
