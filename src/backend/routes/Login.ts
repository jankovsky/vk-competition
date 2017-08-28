import {Router} from 'express';
import Authenticator from '../base/Authenticator';

let LoginRoute = Router();

LoginRoute.route('/')
    .post(Authenticator.auth, (req, res, next) => {
        res.send({status: "success", message: "Successfull auth"});
    }, (err, req, res, info) => {
        res.send(err);
    });

export default LoginRoute;