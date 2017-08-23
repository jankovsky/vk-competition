/**
 * Database singleton
 */
import Config from '../config';
import * as Sequelize from 'sequelize';

class Database extends Sequelize{

    private static _instance: Database = new Database(
        Config.basic.database,
        Config.basic.user,
        Config.basic.password,
        {
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        });

    constructor(database, user, password, settings) {

        if (Database._instance) {
            throw new Error("Error: Instantiation failed: Use Database.getInstance() instead of new.");
        } else {
            super(database, user, password, settings);
        }

        Database._instance = this;
    }

    public static getInstance() {
        return Database._instance;
    }
}

export default Database;