import {Router} from 'express';
import Order from '../models/Order';
import User from '../models/User';
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

export default OrderRoute;