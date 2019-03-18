import {
  updateUserRole,
  addUser,
  loginUser,
  getAllUsers,
  getSingleUser
} from '../../../controllers/Users';

export default {
    Query: {
        user: getSingleUser,
        users: getAllUsers
    },

    Mutation: {
        signup: addUser,
        updateUserRole: updateUserRole,
        login: loginUser
    }
}