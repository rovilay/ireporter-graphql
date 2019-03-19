import Incident from '../models/Incident';
import { verifyUserAndRole } from '../utils/auth';

const getSingleIncident = (_, { id }, context) => {
    return new Promise(async (resolve, reject) => {
        const { user: { _id: userId } = {} } = context;
        const userIsVerified = await verifyUserAndRole("_id", userId, ['ADMIN', 'SUPER_ADMIN', 'USER']);
        if (!userIsVerified) return reject("User does not exist!");

        const query = Incident.findOne({ _id: id, userId });
        query.exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const getAllIncidents = (_, { type }, context) => {
    return new Promise(async (resolve, reject) => {
        const { user: { _id: userId } = {} } = context;
        const userIsVerified = await verifyUserAndRole("_id", userId, ['ADMIN', 'SUPER_ADMIN']);
        if (!userIsVerified) return reject("Only admins can perform this operation!");

        const option = type ? { type } : {};
        const query = Incident.find(option);

        query.exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const getPersonalIncidents = (_, { type }) => {
    return new Promise(async (resolve, reject) => {
        const { user: { _id: userId } = {} } = context;
        const userIsVerified = await verifyUserAndRole("_id", userId, ['ADMIN', 'SUPER_ADMIN', 'USER']);
        if (!userIsVerified) return reject("User does not exist!");

        const option = type ? { type, userId } : { userId };
        const query = Incident.find(option);

        query.exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const createIncident = (_, args, context) => {
    const {
        type,
        comment,
        longitude,
        latitude,
        videos,
        images
    } = args

    const newIncident =  new Incident({type, comment,
        longitude, latitude, videos, images });

    return new Promise(async (resolve, reject) => {
        const { user: { _id: userId } = {} } = context;
        const userIsVerified = await verifyUserAndRole("_id", userId, ['ADMIN', 'SUPER_ADMIN', 'USER']);
        if (!userIsVerified) return reject("User does not exist!");

        newIncident.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const updateIncident = () => {

}

const addIncidentMedia = () => {

}

const deleteIncident = () => {

}

const deleteIncidentMedia = () => {

}

export {
    getSingleIncident,
    getAllIncidents,
    createIncident,
    addIncidentMedia,
    updateIncident,
    deleteIncident,
    deleteIncidentMedia,
    getPersonalIncidents
};
