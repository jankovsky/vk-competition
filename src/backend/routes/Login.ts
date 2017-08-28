import {Router} from 'express';
import Authenticator from '../base/Authenticator';

let LoginRoute = Router();

LoginRoute.route('/')
    .post(Authenticator.auth, (req, res, next) => {
        res.send('Loged in POST!');
    }, (req, res, err) => {
        console.log('Error');
        console.log(req);
        console.log(res);
        console.log(err);
    });

export default LoginRoute;