import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards'; // 컴포넌트 가져오기
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint) // app이 load 되자마자 fetchMovies 해준다.


    }, [])

    const fetchMovies = (endpoint) => {
        
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                
                console.log(response)
                setMovies([...Movies, ...response.results]) // 있던거에 20개를 새로 추가하기위해 원래 있던 Movies의 State를(...Movies) 넣어준다.
                setMainMovieImage(response.results[0])
                setCurrentPage(response.page)

        })
    }

    const loadMoreItems = () => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)

    }

    return (
        
        <div style ={{witdh:'100%',margin:'0'}}>
            { /* Main Image */} 
            {MainMovieImage && 
                <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }
            <div style={{ width:'85%', margin:'1rem auto'}}>
                <h2> Movie by latest</h2>
                <hr />

                {/* Movie Grid Cards */} 
                
                <Row gutter={[16, 16]} /*gutter로 image마다 간격을 준다.*/ >  
                    
                    
                    {Movies && Movies.map((movie, index) => ( // Movies가 있으면! 
                        <React.Fragment key={index}> 
                            <GridCards // 위에 key 값이 있어야 에러 경고 안난다.
                                landingPage
                                image={movie.poster_path ? // poster 있으면 =>
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null} // poster_path 없으면 null 처리
                                movieId={movie.id} // movieId 도 props으로 준다.
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}

                </Row>
                
              
            </div>

            <div style={{ display:'flex', justifyContent :'center'}}>
                <button onClick={loadMoreItems}> Load More </button>

            </div>
        </div>
       
            
        
    )
}

export default LandingPage
