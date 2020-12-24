import React, { useEffect, useState } from 'react'
import './favorite.css';
import Axios from 'axios';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        // 내가 좋아요한 영화의 정보를 가져와야한다.
        Axios.post('/api/favorite/getFavoredMovie' , { userFrom : localStorage.getItem('userId') }) // 로그인한 유저가 누군지 백엔드에 보내준다.
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setFavorites(response.data.favorites) // Favorites state 안에 모든 영화 정보들이 들어간다.

                } else {
                    alert('영화 정보를 가져오는데 실패 했습니다.')
                }
            })
        
    }, [])
    return (
        <div style={{ width : '85%', margin : '3rem auto' }}>
            <h2> Favorite Movies By Me </h2>
            <hr />

            <table>
                <thead>

                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Movie from favorite</th>
                    </tr>
                    </thead>

                    <tbody>
                        {Favorites.map((favorite, index) => (
                            <tr key = {index}>


                                <td>{favorite.movieTitle}</td>
                                <td>{favorite.movieRunTime} mins </td>
                                <td><button>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                
            </table>
        </div>
    )
}

export default FavoritePage
