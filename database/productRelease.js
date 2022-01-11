import { pool } from '../database/connectionPool';

const productRelease = () => {
    return {
        findAll: async () => {
            try {
                let connection = await pool.getConnection(async conn => conn);
                try {
                    let [rows, fields] = await connection.query(`SELECT * FROM product_release`);

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

export default productRelease;