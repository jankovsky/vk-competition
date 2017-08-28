import {Router} from 'express';
import Order from '../models/Order';
import User from '../models/User';
import Authenticator from '../base/Authenticator';

let OrderRoute = Router(),
    OrderModel = new Order(),
    UserModel = new User();

OrderRoute.route('/order')
    .post(Authenticator.isAuthenticated, (req, res, next) => {
        // let params = req.body;
        //
        // if (params.id) {
        //     OrderModel.editUser(params.id, {
        //         firstname: params.firstname,
        //         phone: params.phone
        //     }).then((result) => {
        //         res.send(result);
        //     });
        // }
        console.log('-------user-----');
        console.log(req.user);
        console.log('-------/user-----');
        // UserModel.getUserByName('vadim4').then((res) => {
        //     console.log(res);
        // });
        // OrderModel.postOrder(1,1,'asd','asdhead',() => {
        //     console.log('post order');
        // });
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