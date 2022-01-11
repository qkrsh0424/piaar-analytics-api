import { pool } from '../database/connectionPool';

const product = () => {
    return {
        findAll: async () => {
            try {
                let connection = await pool.getConnection(async conn => conn);
                try {
                    let [rows, fields] = await connection.query(`SELECT * FROM product`);

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

export default product;