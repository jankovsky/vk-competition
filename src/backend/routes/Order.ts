import {Router} from 'express';
import Order from '../models/Order';
import User from '../models/User';
import Authenticator from '../base/Authenticator';

let OrderRoute = Router(),
    OrderModel = new Order(),
    UserModel = new User();

OrderRoute.route('/order')
    .post(Authenticator.isAuthenticated, (req, res, next) => {
        let params = req.body;

        if (req.user.isCustomer) {
            if (params.amount && params.text && params.headText) {
                OrderModel.postOrder(params.amount,req.user.id,params.text,params.headText,() => {
                    res.send({ status: 'success', message: 'Order is created' });
                });
            } else {
                res.send({ status: 'error', message: 'Incorrect data' });
            }
        } else {
            res.send({ status: 'error', message: 'Need to be a customer' });
        }
    })
    .get(Authenticator.isAuthenticated, (req, res, next) => {
        let user_id = parseInt(req.query.user_id),
            order_id = parseInt(req.query.order_id);

        OrderModel.getTargetOrder(user_id, order_id).then((result) => {
            res.status(200).json(result)
        });
    });

OrderRoute.route('/orders')
    .get(Authenticator.isAuthenticated, (req, res, next) => {
        let dataOffset = parseInt(req.query.offset, 10),
            dataLimit = parseInt(req.query.limit, 10);

        if (dataOffset % 2 || dataLimit % 2) {
            res.status(400).json({ status: 'error', message: 'Offset and limit must be even numbers' });
        }

        OrderModel.getOrders(dataOffset, dataLimit).then((result) => {
            let procData = [],
                i,
                j;

            if (result) { // обеъдинить данные из двух БД (вариант если во второй нечетно колво записей?)
                for (j = 0; j < result['1'].length; j++) {
                    for (i = 0; i < result['1'].length; i++) {
                        procData.push(result[i][j]);
                    }
                }
                res.status(200).json(procData);
            } else {
                res.send({ status: 'error', messadge: 'Some error' });
            }
        });
    });

OrderRoute.route('/myorders')
    .get(Authenticator.isAuthenticated, (req, res, next) => {
        let offset,
            limit;

        if (req.user.id && req.query.offset && req.query.limit) {
            offset = parseInt(req.query.offset, 10);
            limit = parseInt(req.query.limit, 10);

            OrderModel.getOrdersByUserId(parseInt(req.user.id, 10), offset, limit).then((result) => {
                res.status(200).json(result);
            });
        }
    });

OrderRoute.route('/execorder')
    .post(Authenticator.isAuthenticated, (req, res, next) => {
        let user_id = parseInt(req.user.id),
            order_id = parseInt(req.body.order_id),
            customer_id = parseInt(req.body.customer_id);

        UserModel.isCustomer(user_id).then((result) => {
            if (!result.get('isCustomer')) {
                OrderModel.execOrder(user_id, order_id, customer_id).then((result) => {
                    let message = {};

                    if (!result) {
                        message['status'] = 'success';
                        message['message'] = 'You successfuly take this order';
                    } else {
                        message['status'] = result.status;
                        message['message'] = result.message;
                    }
                    res.status(200).json(message);
                });
            } else {
                res.status(200).json({ status: 'error', message: 'User must be a not customer' });
            }
        });
    });

export default OrderRoute;