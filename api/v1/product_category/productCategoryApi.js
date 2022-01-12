import productCategory from '../../../database/productCategory';

var express = require('express');
var router = express.Router();

router.get('/list', async (req, res) => {
    try {
        const [productCategoryRows, productCategoryFields] = await productCategory().findAll();

        res.status(200).send({
            status: 200,
            statusMessage: 'SUCCESS',
            message: 'success',
            memo: null,
            data: productCategoryRows
        })
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusMessage: 'INTERNAL_SERVER_ERROR',
            message: 'internal_server_error',
            memo: 'undefined error',
            errorCode: 500,
        })
    }
});

module.exports = router;