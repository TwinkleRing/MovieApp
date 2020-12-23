import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY , IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import GridCards from '../commons/GridCards'; // ������Ʈ ��������
import MovieInfo from './Sections/MovieInfo';
import { Row } from 'antd';

// rfce �� functional component�� ����

function MovieDetail(props) {
    let movieId = props.match.params.movieId; // movieId �������� , app.js���� url ������ �� ����

    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false) // ó���� ȭ�鿡 ���� ��� GridView�� �Ⱥ��̰�

    // MovieId�� ������ API�� �̿��ؼ� Movie DB �������ٰ� ������ �����޶�� ��û�ؾ��Ѵ�.
    useEffect(() => { // DOM�� �ε尡 �Ǹ� ó���� �ؾ��� ������ �־��ָ� �ȴ�.
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo) // ���� API�� ���� ��������

            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response) // ���� API���� ������ ������ State���ٰ� ���� �ֱ�

            })


        fetch(endpointCrew) // ���� API�� ���� ��������
        // ���� api�� �޾ƿ� Crew ������ state�� �־��� ������ GridCard�� �־��ش�.

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

                {ActorToggle &&  // ActorToggle�� True�϶��� ��������.
                    <Row gutter={[16, 16]} /*gutter�� image���� ������ �ش�.*/ >  
                    
                        {Casts && Casts.map((cast, index) => ( 
                            <React.Fragment key={index}> 
                                <GridCards // ���� key ���� �־�� ���� ��� �ȳ���.
                                    image={cast.profile_path ? // profile image ������ =>
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null} // poster_path ������ null ó��
                                
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
