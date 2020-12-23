const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req,res) => {

    // �� ��ȭ�� �󸶳� ���ƿ� ���ڰ� �󸶳� �Ǵ��� �˰�ʹ�.

    // mongoDB���� favorite ���ڸ� ��������
    Favorite.find({ "movieId" : req.body.movieId }) // 
        .exec((err , info) => {
            if (err) return res.status(400).send(err)

            // �� ������ ����Ʈ�� �ٽ� ���� ������ �����ֱ�
            // movieId�� �´� ������ ã������ info�� ����ִ� ����,  ���� �� ����� ���ƿ� �ߴ� �̷��� �� ��� ������ [1,2,3] �̷��� �����Ͱ� ����ִ�.
            //  Ŭ���̾�Ʈ�� �������� �����ش�.
            res.status(200).json({ success : true, favoriteNumber : info.length  } )
    })

})
// express �����ӿ�ũ���� �����ϴ� router ���, index.js�� ��� �־��ָ� �ȴ�.

module.exports = router;
