import {Router} from 'express';
import Authenticator from '../base/Authenticator';

let LoginRoute = Router();

LoginRoute.route('/')
    .post(Authenticator.auth, (req, res, next) => {
        next();
    }, (err, req, res, info) => {
        res.send(err);
    });

export default LoginRoute;