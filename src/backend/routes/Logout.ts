import {Router} from 'express';

let LogoutRoute = Router();

LogoutRoute.route('/')
    .get((req, res, next) => {
        req.logout();
        res.redirect('/');
    });

export default LogoutRoute;