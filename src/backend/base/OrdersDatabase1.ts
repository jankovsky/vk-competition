/**
 * OrdersDatabase1 singleton
 */
import Config from '../config';
import * as Sequelize from 'sequelize';

class OrdersDatabase1 extends Sequelize{

    private static _instance: OrdersDatabase1 = new OrdersDatabase1(
            Config.basic.mysql.ordersDb1.name,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            Config.basic.mysql.ordersDb1.config
        );

    constructor(database, user, password, settings) {

        if (OrdersDatabase1._instance) {
            throw new Error("Error: Instantiation failed: Use Database.getInstance() instead of new.");
        } else {
            super(database, user, password, settings);
        }

        OrdersDatabase1._instance = this;
    }

    public static getInstance() {
        return OrdersDatabase1._instance;
    }
}

export default OrdersDatabase1;