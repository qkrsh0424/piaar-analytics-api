import mysql from 'mysql2/promise';
import db_config from '../../config/db_config.json';

const pool = mysql.createPool({
    connectionLimit: db_config.connectionLimit,
    waitForConnections: db_config.waitForConnections,
    host: db_config.host,
    port: db_config.port,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
});

//connetion을 획득하면 %d부분에 connetion id가 출력된다.  #### 여기 보세요 #####
pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

//connetion을 끊으면 %d부분에 connetion id가 출력된다.  #### 여기 보세요 #####
pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

//사용 가능한 connetion이 존재하지 않으면 큐에 등록하고 순서를 기다린다. #### 여기 보세요 ####
pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

export {
    pool
}