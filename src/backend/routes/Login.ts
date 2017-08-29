import {Router} from 'express';
import Authenticator from '../base/Authenticator';

let LoginRoute = Router();

LoginRoute.route('/')
    .post(Authenticator.auth, (req, res, next) => {
        res.status(200).json({ status: 'succsess', message: 'Succsessfull login' });
    }, (err, req, res, info) => {
        res.send(err);
    });

export default LoginRoute;