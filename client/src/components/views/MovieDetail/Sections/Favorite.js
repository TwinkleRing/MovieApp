import React, { useEffect , useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime


    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    useEffect(() => {
        // page 켜지자마자 얼마나 많은 사람이 Favorite 했는지 정보 얻어와야한다.
        // 몽고 db에 있는 걸 요청해서 가져온다. fetch나 axios를 사용한다.

        let variables = {
            userFrom,
            movieId

        }

        Axios.post('/api/favorite/favoriteNumber', variables) // axios를 이용해서 서버로 요청을 보낸다.
            .then(response => {
                console.log(response.data)
                setFavoriteNumber(response.data.favoriteNumber)

                if(response.data.success) {
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.');
                }
            })

        Axios.post('/api/favorite/favorited', variables) // axios를 이용해서 서버로 요청을 보낸다.
            .then(response => {
                
                if(response.data.success) {
                    console.log('favorited', response.data)
                    setFavorited(response.data.favorited)

                } else {
                    alert('정보를 가져오는데 실패 했습니다.');
                }
            })
    

    }, [])

    return (
        <div>
            <Button> { Favorited? "Not Favorite" : "Add to Favorite "} {FavoriteNumber} </Button>
        </div>
    )
}

export default Favorite
