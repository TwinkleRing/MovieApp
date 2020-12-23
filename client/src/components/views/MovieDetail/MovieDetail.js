import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY , IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

// rfce 로 functional component를 생성

function MovieDetail(props) {
    let movieId = props.match.params.movieId; // movieId 가져오기 , app.js에서 url 설정한 거 봐바

    const [Movie, setMovie] = useState([]);

    // MovieId를 가지고 API를 이용해서 Movie DB 서버에다가 정보를 보내달라고 요청해야한다.
    useEffect(() => { // DOM이 로드가 되면 처음에 해야할 동작을 넣어주면 된다.
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo) // 무비 API로 정보 가져오기

            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response) // 무비 API에서 가져온 정보를 State에다가 집어 넣기

            })

    }, [])


    return (
        <div>

            { /* Header */ }

            <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
            />

            { /* Body */ }
            <div style={{ width : '85%', margin : '1rem auto' }}>


                { /* Movie Info */ }

                < MovieInfo
                    movie = { Movie }
                />    


                <br />
                { /* Actors Grid */ }

                <div style={{ display : 'flex', justifyContent : 'center' , margin : '2rem' }}>
                    <button > Toggle Actor View </button>
                </div>

            </div>
        </div>
    )
}

export default MovieDetail
