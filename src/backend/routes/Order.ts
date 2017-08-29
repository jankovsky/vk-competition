import {Router} from 'express';
import Order from '../models/Order';
import Authenticator from '../base/Authenticator';

let OrderRoute = Router(),
    OrderModel = new Order();

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
    });

OrderRoute.route('/order/:id')
    .get(Authenticator.isAuthenticated, (req, res, next) => {
        // OrderModel.getUserById(req.params.id).then((result) => {
        //     res.send(result);
        // });
        res.send('successfull get by id query');
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

export default OrderRoute;