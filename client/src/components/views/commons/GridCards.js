// rfce 
import React from 'react'
import { Col } from 'antd';

function GridCards(props) {
    return (
        // 가장 클때는 6개 작을때는 한 칼람이 모든 행을 다 차지하게
        <Col lg={6} md={8} xs={24}> 
            <div style={{ position: 'relative' }}>
                <a href={`/movie/${props.movieId}`} >
                    <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
                </a>
            </div>
        </Col>
    )
}

export default GridCards
