import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY , IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import GridCards from '../commons/GridCards'; // 컴포넌트 가져오기
import MovieInfo from './Sections/MovieInfo';
import { Row } from 'antd';

// rfce 로 functional component를 생성

function MovieDetail(props) {
    let movieId = props.match.params.movieId; // movieId 가져오기 , app.js에서 url 설정한 거 봐바

    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false) // 처음에 화면에 들어가면 배우 GridView가 안보이게

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


        fetch(endpointCrew) // 무비 API로 정보 가져오기
        // 무비 api로 받아온 Crew 정보를 state에 넣어준 다음에 GridCard에 넣어준다.

            .then(response => response.json())
            .then(response => {
                console.log('responseForCrew',response)
                setCasts(response.cast)
                
            })
            

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }


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
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>

                {ActorToggle &&  // ActorToggle이 True일때만 보여주자.
                    <Row gutter={[16, 16]} /*gutter로 image마다 간격을 준다.*/ >  
                    
                        {Casts && Casts.map((cast, index) => ( 
                            <React.Fragment key={index}> 
                                <GridCards // 위에 key 값이 있어야 에러 경고 안난다.
                                    image={cast.profile_path ? // profile image 있으면 =>
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null} // poster_path 없으면 null 처리
                                
                                    characterName={cast.name}
                                    
                                   
                                />
                            </React.Fragment>
                        ))}

                    </Row>
                
                }

            </div>
        </div>
    )
}

export default MovieDetail
