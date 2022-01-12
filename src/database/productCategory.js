import { pool } from './connectionPool';

const productCategory = () => {
    return {
        findAll: async () => {
            try {
                let connection = await pool.getConnection(async conn => conn);
                try {
                    let [rows, fields] = await connection.query(`SELECT * FROM product_category`);

                    connection.release();

                    return [rows, fields];
                } catch (err) {
                    connection.rollback();
                    connection.release();
                    console.log('DB query error');
                    throw err;
                }
            } catch (err) {
                console.log('DB connect error');
                throw err;
            }
        }
    }
}

export default productCategory;