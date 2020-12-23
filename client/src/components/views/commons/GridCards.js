// rfce 
import React from 'react'
import { Col } from 'antd';

function GridCards(props) {
    if(props.landingPage) {
        return (
            // 가장 클때는 6개,한 컬럼에 24size(6x4=24), 중간일때는 3개(8x3=24) ,작을때는 한 칼람이 모든 행을 다 차지하게
            <Col lg={6} md={8} xs={24}> 
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`} >
                        <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        )

    } else {
        return (
            <Col lg={6} md={8} xs={24}> 
                <div style={{ position: 'relative' }}>
                        <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.characterName} />
        
                </div>
            </Col>
        )
    }
    
}

export default GridCards
