import {
    getSingleIncident,
    getAllIncidents,
    createIncident,
    addIncidentMedia,
    updateIncident,
    deleteIncident,
    deleteIncidentMedia,
    getPersonalIncidents
} from '../../../controllers/Incidents';

export default {
    Query: {
        incident: getSingleIncident,
        incidents: getAllIncidents,
        personalIncidents: getPersonalIncidents
    },
    Mutation: {
        reportIncident: createIncident,
        updateIncident: updateIncident,
        addIncidentMedia: addIncidentMedia,
        deleteIncident: deleteIncident,
        deleteIncidentMedia: deleteIncidentMedia,
    }
}