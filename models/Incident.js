import mongoose from 'mongoose';

import { MediaSchema } from './Media';

const Schema = mongoose.Schema;

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
        type: mongoose.Decimal128,
        trim: true,
        required: [true, 'longitude is required!' ],
        validate: {
            validator: () => {
                const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
                const valid = regex.test(profileImage);
                return valid;
            },
            message: () => 'longitude is invalid'
        }
    },
    latitude: {
        type: mongoose.Decimal128,
        trim: true,
        required: [true, 'latitude is required!' ],
        validate: {
            validator: () => {
                const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
                const valid = regex.test(profileImage);
                return valid;
            },
            message: () => 'longitude is invalid'
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
