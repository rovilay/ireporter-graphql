import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MediaSchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    urls: {
        type: [String],
        required: false,
        validate: {
            validator: (media) => {
                const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
                if (media.length) {
                    const valid = media.every(v => regex.test(v));
                    return valid
                }
            }
        }
    }
});

const Media = mongoose.model('Media', MediaSchema);

export default Media;
