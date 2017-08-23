import {Router} from 'express';
import Authenticator from '../base/Authenticator';

let LoginRoute = Router();

LoginRoute.route('/')
    .post(Authenticator.auth, (req, res, next) => {
        res.send('Loged in POST!');
    });

export default LoginRoute;