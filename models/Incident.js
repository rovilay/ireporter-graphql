import mongoose from 'mongoose';
import { loadType } from 'mongoose-float';

import { MediaSchema } from './Media';

const Schema = mongoose.Schema;
const Float = loadType(mongoose, 8);

const IncidentSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: true,
        uppercase: true,
        enum: ['RED_FLAG', 'INTERVENTION']
    },
    status: {
        type: String,
        trim: true,
        required: true,
        uppercase: true,
        default: 'DRAFT',
        enum: ['DRAFT', 'UNDER_INVESTIGATION', 'RESOLVED', 'REJECTED']
    },
    comment: {
        type: String,
        trim: true,
        required: true,
    },
    longitude: {
        type: Float,
        trim: true,
        required: [true, 'longitude is required!'],
        validate: {
            validator: (longitude) => {
                const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
                const valid = regex.test(longitude);
                return valid;
            },
            message: () => 'longitude is invalid'
        }
    },
    latitude: {
        type: Float,
        // trim: true,
        required: [true, 'latitude is required!' ],
        validate: {
            validator: (latitude) => {
                console.log(latitude, '>>>>>>>>>>>>')
                const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
                const valid = regex.test(latitude);
                console.log('valid-------', valid);
                return valid;
            },
            message: () => 'latitude is invalid'
        }
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    media: [MediaSchema]
});

const Incident = mongoose.model('Incident', IncidentSchema);

export default Incident;
