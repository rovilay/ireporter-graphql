import mongoose from 'mongoose';

import hashPassword from '../utils/hashPassword';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true,
        validate: {
            validator: (email) => {
                const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
                const valid = regex.test(email);
                return valid;
            },
            message: () => "email is invalid!"
        }
    },
    profileImage: {
        type: String,
        required: true,
        trim: true,
        default: "https://res.cloudinary.com/rovilay/image/upload/v1546762436/profile-image-placeholder.png",
        validate: {
            validator: (profileImage) => {
                const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
                const valid = regex.test(profileImage);
                return valid;
            },
            message: () => "profile image url is invalid"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: 'USER',
        uppercase: true,
        enum: ['ADMIN', 'SUPER_ADMIN', 'USER']
    }
});

UserSchema.pre('save', async function() {
    try {
        if (this.password) {
            this.password = await hashPassword(this.password);
        }
    } catch (error) {
        throw new Error('hash error');
    }
});

const User = mongoose.model('User', UserSchema);

export default User;
