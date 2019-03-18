import User from '../models/User';
import { comparePassword } from '../utils/hashPassword';
import { generateToken, verifyUserAndRole } from '../utils/auth';

const getSingleUser =  (_, { id }) => {
    return new Promise((resolve, reject) => {
        User.findById(id).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const getAllUsers = (_, args, context) => {
    return new Promise(async (resolve, reject) => {
        const { user: { _id } = {} } = context;

        const userIsVerified = await verifyUserAndRole("_id", _id, ['ADMIN', 'SUPER_ADMIN']);
        if (!userIsVerified) return reject("Only admins can perform this operation!");

        User.find({}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const addUser = (_, { firstName, lastName, password, email, profileImage }) => {
    const newUser = new User({
    firstName, lastName, password,
    email, profileImage
    });

    return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const updateUserRole = (_, { id, role }, context) => {
    return new Promise(async (resolve, reject) => {
      const {  user: { _id } = {} } = context;

      const userIsVerified = await verifyUserAndRole("_id", _id, ['SUPER_ADMIN']);
      if (!userIsVerified) return reject('Only super admin can perform this operation!');

      const query = User.findOneAndUpdate({ _id: id }, { role }, { new: true });
      query.exec((err, res) => {
        err ? reject(err) : resolve(res);
      })
    })
}

const loginUser = (_, { email, password}) => {
    return new Promise((resolve, reject)=> {
      const query = User.findOne({ email });

      query.exec( async (err, user) => {
            if (err) return reject(err);

            const hashedPassword = user.password;
            const match = await comparePassword(hashedPassword, password);

            if(match) {
                const token = generateToken(user);
                resolve({ token });
            } else  {
                const err = new Error("password is incorrect");
                reject(err);
            }
        });
    });
  }

export {
    getAllUsers,
    getSingleUser,
    updateUserRole,
    addUser,
    loginUser,
}
