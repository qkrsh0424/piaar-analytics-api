import { pool } from '../database/connectionPool';

const productOption = () => {
    return {
        findByProductCids: async (productCids) => {
            try {
                let connection = await pool.getConnection(async conn => conn);
                try {
                    let [rows, fields] = await connection.query(`SELECT * FROM product_option po WHERE po.product_cid IN (?)`, [productCids]);

                    connection.release();

                    return [rows, fields];
                } catch (err) {
                    connection.rollback();
                    connection.release();
                    console.log('DB query error : productOption > findByProductCids');
                    throw err;
                }
            } catch (err) {
                console.log('DB connect error : productOption > findByProductCids');
                throw err;
            }
        },
        findByProductCidsWithUnits: async (productCids) => {
            try {
                let connection = await pool.getConnection(async conn => conn);
                try {
                    let [rows, fields] = await connection.query(`
                        SELECT 
                            po.*,
                            (SELECT IFNULL(SUM(prec.receive_unit), 0) FROM product_receive prec WHERE prec.product_option_cid=po.cid) as 'total_receive_unit',
                            (SELECT IFNULL(SUM(prel.release_unit),0) FROM product_release prel WHERE prel.product_option_cid=po.cid) as 'total_release_unit',
                            (SELECT IFNULL(SUM(prel.release_unit),0) FROM product_release prel WHERE prel.product_option_cid=po.cid AND prel.created_at BETWEEN DATE_SUB(now(), INTERVAL 15 DAY) AND now()) as 'total_release_unit_15'
                        FROM product_option po WHERE po.product_cid IN (?)
                    `, [productCids]);
                    connection.release();

                    return [rows, fields];
                } catch (err) {
                    connection.rollback();
                    connection.release();
                    console.log('DB query error : productOption > findByProductCids');
                    throw err;
                }
            } catch (err) {
                console.log('DB connect error : productOption > findByProductCids');
                throw err;
            }
        }
    }
}

export default productOption;