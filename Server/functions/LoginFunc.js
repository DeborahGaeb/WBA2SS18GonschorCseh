'use strict';

const user = require('../model/user');
const bcrypt = require('bcryptjs');

exports.loginUser = (email, password) =>

    new Promise((resolve,reject) => {

        user.find({email: email})

            .then(users => {

                if (users.length === 0) {

                    reject({ status: 404, message: 'User Not Found !' });

                } else {

                    let user = users[0];
                    return user;

                }
            })

            .then(user => {

                const hashed_password = user.hashed_pass;

                if (bcrypt.compareSync(password, hashed_password)) {

                    resolve({ status: 200, message: email });

                } else {

                    reject({ status: 401, message: 'Invalid Credentials !' });
                }
            })

            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

    });