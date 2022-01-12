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
        },
        findByCondition: async (params) => {
            let conditions = buildConditions(params);
            let sqlQuery = `SELECT * FROM product WHERE ${conditions.where}`;

            try {
                let connection = await pool.getConnection(async conn => conn);
                try {
                    let [rows, fields] = await connection.query(sqlQuery, conditions.values);

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

function buildConditions(params) {
    var conditions = [];
    var values = [];
    var conditionsStr;

    if (typeof params.productCategoryCid !== 'undefined') {
        conditions.push("product_category_cid = ?");
        values.push(params.productCategoryCid);
    }

    if (typeof params.keyword !== 'undefined') {
        conditions.push("(default_name LIKE ? OR management_name LIKE ? OR code LIKE ?)");
        values.push(`%${params.keyword}%`);
        values.push(`%${params.keyword}%`);
        values.push(`%${params.keyword}%`);
    }

    return {
        where: conditions.length ?
            conditions.join(' AND ') : '1',
        values: values
    };
}

export default product;