import * as Sequelize from 'sequelize';
import Database from '../base/Database';
import * as Bcrypt from 'bcrypt';

export default class User {

    private user;

    constructor() {
        this.user = Database.getInstance().define('users', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            isCustomer: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },
            surname: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            }
        }, {
            timestamps: false
        });
    }

    public getUsers () {
        return this.user.findAll({
            attributes: {
                exclude: ['password']
            }
        });
    };

    public getUserByName (username: string) {
        return this.user.find({
            where: {
                username: username
            }
        });
    };

    public getUserById (id: number) {
        return this.user.find({
            where: {
                id: id
            }
        });
    }

    public createUser (username: string, password: string, isCustomer: number, callback: Function) {
        if (!username || !password || !isCustomer) {
            console.log('Error userdata');
            return false;
        } else {
            Bcrypt.genSalt(10, (err, salt) => {
                Bcrypt.hash(password, salt, (err, hash) => {
                    this.user.create({
                        username: username,
                        password: hash,
                        isCustomer: isCustomer
                    }).then(callback);
                });
            });
        }
    }

    public editUser (id: number, params) {
        let query = [];

        if (params.firstname) {
            query.push(this.user.update(
                {
                    firstname: params.firstname
                },
                {
                    where: {
                        id: id
                    }
                })
            );
        }

        if (params.phone) {
            query.push(this.user.update(
                {
                    phone: params.phone
                },
                {
                    where: {
                        id: id
                    }
                })
            );
        }

        return Promise.all(query);
    }
}