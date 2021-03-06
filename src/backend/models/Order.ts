import * as Sequelize from 'sequelize';
import OrdersDatabase1 from '../base/OrdersDatabase1';
import OrdersDatabase2 from '../base/OrdersDatabase2';
import Config from '../config';

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

    public getOrders(offset: number, limit: number): Promise<any> {
        let queryParams = {},
            promisesStack = [];

        if (offset) {
            queryParams['offset'] = offset / 2;
        } else {
            queryParams['offset'] = 0;
        }

        queryParams['limit'] = limit ? limit / 2 : Config.basic.defaultRecordsPerPage / 2;
        promisesStack.push(this.order1.findAll(queryParams), this.order2.findAll(queryParams));

        return Promise.all(promisesStack);
    }

    public getOrdersByUserId(id: number, offset: number, limit: number) {
        let targetDb;

        if (id % 2) {
            targetDb = this.order1;
        } else {
            targetDb = this.order2;
        }

        return targetDb.findAll({
            where: {
                customer: id
            },
            limit: limit,
            offset: offset
        });
    }

    public getTargetOrder(user_id: number, order_id: number) {
        let targetDb;

        if (user_id % 2) {
            targetDb = this.order1;
        } else {
            targetDb = this.order2;
        }

        return targetDb.findOne({
            where: {
                customer: user_id,
                id: order_id
            }
        });
    }

    public execOrder(user_id: number, order_id: number, customer_id: number) {
        let targetDb;

        if (customer_id % 2) {
            targetDb = this.order1;
        } else {
            targetDb = this.order2;
        }

        return targetDb.findOne({
            where: {
                customer: customer_id,
                id: order_id
            }
        }).then((result) => {
            if (!result.get('contractor')) {
                targetDb.upsert({
                    id: order_id,
                    contractor: user_id,
                    amount: result.get('amount'),
                    customer: result.get('customer'),
                    text: result.get('text'),
                    headText: result.get('headText'),
                    status: 1,
                    time: result.get('time'),
                    id_prefix: result.get('id_prefix')
                });
            } else {
                return {
                    status: 'error',
                    message: 'The order is already booked'
                };
            }
        });
    }
}