/**
 * RedisDatabase singleton
 */
import Config from '../config';
import * as Redis from 'redis';
import {RedisClient} from "redis";

class RedisDatabase extends RedisClient {

    private static _instance = new RedisDatabase(
        Config.basic.redis.ip,
        Config.basic.redis.port,
        process.env.DB_PASSWORD
    );

    constructor(host, port, password) {
        super({
            host: host,
            port: port,
            password: password
        });
        if (RedisDatabase._instance) {
            throw new Error("Error: Instantiation failed: Use RedisDatabase.getInstance() instead of new.");
        } else {
            return Redis.createClient({
                host: host,
                port: port,
                password: password
            });
        }

    }

    public static getInstance() {
        return RedisDatabase._instance;
    }
}

export default RedisDatabase;