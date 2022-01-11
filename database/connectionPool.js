import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    connectionLimit: 10,
    waitForConnections: true,
    host: 'dbp1.cr5f1puv6pnj.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'peoto',
    password: 'peotodbp134!#',
    database: 'piaar_main_v3.0.0'
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