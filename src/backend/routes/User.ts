import {Router} from 'express';
import Authenticator from '../base/Authenticator';
import RedisDatabase from '../base/RedisDatabase';

let UserRoute = Router();
console.log(RedisDatabase.getInstance());

UserRoute.route('/user')
    .get(Authenticator.isAuthenticated, (req, res, next) => {

        res.status(200).json(req.user);
    });

export default UserRoute;