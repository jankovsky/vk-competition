/**
 * OrdersDatabase2 singleton
 */
import Config from '../config';
import * as Sequelize from 'sequelize';

class OrdersDatabase2 extends Sequelize{

    private static _instance: OrdersDatabase2 = new OrdersDatabase2(
            Config.basic.mysql.ordersDb2.name,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            Config.basic.mysql.ordersDb2.config
        );

    constructor(database, user, password, settings) {

        if (OrdersDatabase2._instance) {
            throw new Error("Error: Instantiation failed: Use Database.getInstance() instead of new.");
        } else {
            super(database, user, password, settings);
        }

        OrdersDatabase2._instance = this;
    }

    public static getInstance() {
        return OrdersDatabase2._instance;
    }
}

export default OrdersDatabase2;