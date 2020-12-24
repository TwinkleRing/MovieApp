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

    let variables = {

        userFrom : userFrom,
        movieId : movieId,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRunTime

    }

    useEffect(() => {
        // page �����ڸ��� �󸶳� ���� ����� Favorite �ߴ��� ���� ���;��Ѵ�.
        // ���� db�� �ִ� �� ��û�ؼ� �����´�. fetch�� axios�� ����Ѵ�.

        

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
                    setFavorited(response.data.favorited)
                } else {
                    alert('������ �������µ� ���� �߽��ϴ�.');
                }
            })
    
    }, [])


    const onClickFavorite = () => {

        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite',  variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)

                    } else {
                         alert('Favorite list���� ����� �� �����߽��ϴ�.');
                    }
                })

        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)

                    } else {
                        alert('Favorite ����Ʈ���� �߰��ϴ� �� �����߽��ϴ�.')
                    }
                })
        }
    }

     return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? " Not Favorite" : "Add to Favorite "}  {FavoriteNumber}  </Button>

        </div>
    )
}

export default Favorite
