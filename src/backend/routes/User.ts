import {Router} from 'express';
import Authenticator from '../base/Authenticator';

let UserRoute = Router();

UserRoute.route('/user')
    .get(Authenticator.isAuthenticated, (req, res, next) => {
        res.status(200).json(req.user);
    });

export default UserRoute;