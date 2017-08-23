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
                    done(null, userIdAndRoleId.username);
                } else {
                    done(true, false);
                }
            });
        });

        Passport.deserializeUser((userIdAndRoleId: string, done) => {
            if (userIdAndRoleId) {
                this.UserModel.getUserByName(userIdAndRoleId).then((result) => {
                    if (result) {
                        done(null, userIdAndRoleId);
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
        if (!username || !password) return false;

        this.UserModel.getUserByName(username).then((result) => {
            if (result) {
                Bcrypt.genSalt(10, (err, salt) => {
                    Bcrypt.hash(password, salt, (err, hash) => {
                        Bcrypt.compare(result.get('password'), hash, (err, res) => {
                            if (err) {
                                callback(false);
                            } else {
                                callback(true);
                            }
                        });
                    });
                });
            } else {
                callback(false);
            }
        });
    }

}

export default Authenticator.getInstance();