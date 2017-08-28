/**
 * SystemDatabase singleton
 */
import Config from '../config';
import * as Sequelize from 'sequelize';

class SystemDatabase extends Sequelize{

    private static _instance: SystemDatabase = new SystemDatabase(
            Config.basic.mysql.systemDb.name,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            Config.basic.mysql.systemDb.config
        );

    constructor(database, user, password, settings) {

        if (SystemDatabase._instance) {
            throw new Error("Error: Instantiation failed: Use Database.getInstance() instead of new.");
        } else {
            super(database, user, password, settings);
        }

        SystemDatabase._instance = this;
    }

    public static getInstance() {
        return SystemDatabase._instance;
    }
}

export default SystemDatabase;