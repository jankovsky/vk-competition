/**
 * Authorization singleton
 */
import * as Passport from 'passport';
import {Strategy} from 'passport-local';
import User from '../models/User';
import * as Bcrypt from 'bcrypt';
import {UserIdAndRoleId} from '../interfaces/UserIdAndRoleId';

class Authenticator {

    private static _instance: Authenticator = new Authenticator();
    private UserModel = new User();

    constructor () {

        if (Authenticator._instance) {
            throw new Error("Error: Instantiation failed: Use Authenticator.getInstance() instead of new.");
        }

        Passport.serializeUser((userIdAndRoleId: UserIdAndRoleId, done) => {
            this.authUser(userIdAndRoleId.username, userIdAndRoleId.password, (result) => {
                if (result) {
                    done(null, {
                        id: result.id,
                        username: result.username,
                        isCustomer: result.isCustomer,
                        email: result.email
                    });
                } else {
                    done({status: 'error', message: 'Incorrect username or password'}, false);
                }
            });
        });

        Passport.deserializeUser((user: object, done) => {
            if (user) {
                this.UserModel.getUserByName(user['username']).then((result) => {
                    if (result) {
                        done(null, {
                            id: result.get('id'),
                            username: result.get('username'),
                            isCustomer: result.get('isCustomer'),
                            email: result.get('email')
                        });
                    } else {
                        done(null, false);
                    }
                });
            }
        });

        Passport.use(new Strategy(
            (username, password, callback) => {
                return callback(null, {
                    username: username,
                    password: password
                });
            }
        ));

        Authenticator._instance = this;

    }

    public static getInstance () {
        return Authenticator._instance;
    }

    public get auth () {
        return Passport.authenticate('local', { failureRedirect: '/', session : true });
    }

    public isAuthenticated (req, res, next: Function) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.status(401).json({
                error: 'User not authenticated'
            });
        }
    }

    public authUser (username: string, password: string, callback: Function) {
        if (!username || !password) {
            return false;
        }

        this.UserModel.getUserByName(username).then((result) => {
            if (result) {
                Bcrypt.compare(password, result.get('password'), (err, isMatch) => {
                    if (isMatch) {
                        callback({
                            id: result.get('id'),
                            username: result.get('username'),
                            isCustomer: result.get('isCustomer'),
                            email: result.get('email')
                        });
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(false);
            }
        });
    }

}

export default Authenticator.getInstance();