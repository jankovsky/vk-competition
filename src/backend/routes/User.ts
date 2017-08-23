import {Router} from 'express';
import User from '../models/User';
import Authenticator from '../base/Authenticator';

let UserRoute = Router(),
    UserModel = new User();

UserRoute.route('/user')
    .get(Authenticator.isAuthenticated, (req, res, next) => {
        UserModel.getUsers().then((result) => {
            res.send(result);
        });
    })
    .post(Authenticator.isAuthenticated, (req, res, next) => {
        let params = req.body;

        if (params.id) {
            UserModel.editUser(params.id, {
                firstname: params.firstname,
                phone: params.phone
            }).then((result) => {
                res.send(result);
            });
        }
    });

UserRoute.route('/user/:id')
    .get(Authenticator.isAuthenticated, (req, res, next) => {
        UserModel.getUserById(req.params.id).then((result) => {
            res.send(result);
        });
    });

export default UserRoute;