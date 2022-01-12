import product from '../../../database/product';
import productOption from '../../../database/productOption';

var express = require('express');
var router = express.Router();

router.get('/list-fj/with-unit', async (req, res) => {
    let params = req.query;

    try {
        const [productRows, productFields] = await product().findByCondition(params);
        const productCids = productRows.map(r => r.cid);

        let result = null;
        if (productCids.length !== 0) {
            const [productOptionRows, productOptionFields] = await productOption().findByProductCidsWithUnits(productCids);

            result = productRows.map(product => {
                let json = {
                    product: product,
                    productOptions: productOptionRows.filter(productOption => productOption.product_cid === product.cid)
                }

                return json;
            })
        }

        res.status(200).send({
            status: 200,
            statusMessage: 'SUCCESS',
            message: 'success',
            memo: null,
            data: result
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