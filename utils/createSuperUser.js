import env from 'dotenv';

import User from '../models/User';

env.config();

const firstName = process.env.SUPER_USER_FIRSTNAME;
const lastName = process.env.SUPER_USER_LASTNAME;
const email = process.env.SUPER_USER_EMAIL;
const password = process.env.SUPER_USER_PASSWORD;
const role = process.env.SUPER_USER_ROLE;

const createSuperUser = async () => {
    const query = User.findOne({ email });
    await query.exec((err, res) => {
        if (err) return console.log(err);
        if (!res) {
            console.log('creating super admin...');
            const superAdmin = new User({ 
                email, firstName, lastName, role, password
            });

            superAdmin.save((err, res) => {
                if (err) return console.log('super admin creation error');

                console.log('super admin created!');
            });
        }
    });
}

export default createSuperUser;
