export default class Config {
    public static basic = {
        host: '127.0.0.1',
        user: 'root',
        password: 'vadimishe',
        database: 'rentolab',
        server: {
            port: 3333
        },
        backendPath: __dirname,
        nodeServerNumber: 1, // 1 or 2 for choice db masters and slaves servers
        ordersCommissionPerc: 10,
        dbReadWriteScheme: 'master', // or master/slave if mysql-replication is available
        redis: {
            ip: '127.0.0.1'
        },
        mysql: {
            systemDb: '127.0.0.1', // db with users-table and system-table
            ordersMastersDb: {
                even: '127.0.0.1', // even user_id orders shard
                odd: '127.0.0.1' // odd user_id orders shard
            },
            ordersSlavesDb: { // config for master-slave read-write scheme in the future
                even: '127.0.0.1',
                odd: '127.0.0.1',
                isActive: false
            }
        }
    };
}