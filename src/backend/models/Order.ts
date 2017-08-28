import * as Sequelize from 'sequelize';
import OrdersDatabase1 from '../base/OrdersDatabase1';
import OrdersDatabase2 from '../base/OrdersDatabase2';

export default class Order {

    private order1;
    private order2;

    constructor() {
        this.order1 = OrdersDatabase1.getInstance().define('orders', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            contractor: {
                type: Sequelize.INTEGER,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            customer: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            headText: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },
            time: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        }, {
            timestamps: false
        });

        this.order2 = OrdersDatabase2.getInstance().define('orders', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            contractor: {
                type: Sequelize.INTEGER,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            customer: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            headText: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },
            time: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        }, {
            timestamps: false
        });
    }

    public postOrder(amount: number, customer_id: number, text: string, headText: string, callback: Function) {
        if (customer_id % 2) { // if customer_id is odd - write in first database
            this.order1.create({
                amount: amount,
                customer: customer_id,
                text: text,
                headText: headText,
                time: new Date().getTime()
            }).then(callback);
        } else {
            this.order2.create({
                amount: amount,
                customer: customer_id,
                text: text,
                headText: headText,
                time: new Date().getTime()
            }).then(callback);
        }
    }
}