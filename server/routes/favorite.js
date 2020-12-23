const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req,res) => {

    // 이 영화에 얼마나 좋아요 숫자가 얼마나 되는지 알고싶다.

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId" : req.body.movieId }) // 
        .exec((err , info) => {
            if (err) return res.status(400).send(err)

            // 그 다음에 프론트에 다시 숫자 정보를 보내주기
            // movieId에 맞는 정보를 찾았으면 info에 들어있는 정보,  만약 세 사람이 좋아요 했다 이러면 이 모든 정보를 [1,2,3] 이렇게 데이터가 들어있다.
            //  클라이언트에 응답으로 돌려준다.
            res.status(200).json({ success : true, favoriteNumber : info.length  } )
    })

})
// express 프레임워크에서 제공하는 router 사용, index.js에 경로 넣어주면 된다.

module.exports = router;
