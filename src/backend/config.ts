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
        mysql: {
            systemDb: {
                ip: '127.0.0.1',
                name: 'vktour_system',
                config: {
                    dialect: 'mysql',
                    pool: {
                        max: 5,
                        min: 0,
                        idle: 10000
                    }
                }
            },
            ordersDb1: {
                ip: '127.0.0.1',
                name: 'vktour_orders1',
                config: {
                    dialect: 'mysql',
                    pool: {
                        max: 5,
                        min: 0,
                        idle: 10000
                    }
                }
            },
            ordersDb2: {
                ip: '127.0.0.1',
                name: 'vktour_orders2',
                config: {
                    dialect: 'mysql',
                    pool: {
                        max: 5,
                        min: 0,
                        idle: 10000
                    }
                }
            }
        }
    };
}