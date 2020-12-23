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
        // page �����ڸ��� �󸶳� ���� ����� Favorite �ߴ��� ���� ���;��Ѵ�.
        // ���� db�� �ִ� �� ��û�ؼ� �����´�. fetch�� axios�� ����Ѵ�.

        let variables = {
            userFrom,
            movieId

        }

        Axios.post('/api/favorite/favoriteNumber', variables) // axios�� �̿��ؼ� ������ ��û�� ������.
            .then(response => {
                console.log(response.data)
                setFavoriteNumber(response.data.favoriteNumber)

                if(response.data.success) {
                } else {
                    alert('���� ������ �������µ� ���� �߽��ϴ�.');
                }
            })

        Axios.post('/api/favorite/favorited', variables) // axios�� �̿��ؼ� ������ ��û�� ������.
            .then(response => {
                
                if(response.data.success) {
                    console.log('favorited', response.data)
                    setFavorited(response.data.favorited)

                } else {
                    alert('������ �������µ� ���� �߽��ϴ�.');
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
