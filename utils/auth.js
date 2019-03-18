import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import expressJwt from 'express-jwt';

import User from '../models/User';

dotenv.config();

function generateToken(user) {
  const { _id, role,  email, firstName, lastName } = user;
  const token = jwt.sign({ _id, role,  email, firstName, lastName },
    process.env.SECRET, { expiresIn: '24h' });
  return token;
}

function verifyToken(token) {
  
    if (token) {
        jwt.verify(token, process.env.SECRET, (error, userData) => {
            if (error || userData === undefined) {
            throw new Error('error verifying token');
            }
  
            return userData;
        });
    } 
}

function verifyUserAndRole(propertyToVerifyBy, propertyValue, roles) {
        return new Promise((resolve) => { 

            User.findOne({ [propertyToVerifyBy]: propertyValue })
            .exec((err, user) => {
                if (err || !user) return resolve(false);
                const valid = roles.includes(user.role);
                return resolve(valid);
            })

        })
}

const auth = expressJwt({
    secret: process.env.SECRET,
    credentialsRequired: false
});

export {
    generateToken,
    verifyToken,
    verifyUserAndRole,
    auth as default
};