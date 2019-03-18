import { GraphQLEnumType } from 'graphql';

new GraphQLEnumType({
    name: 'IncidentType',
    values: {
        RED_FLAG: {
            value: "RED_FLAG",
        },
        INTERVENTION: {
            value: "INTERVENTION",
        },
    },
});

new GraphQLEnumType({
    name: 'IncidentStatus',
    values: {
        DRAFT: {
            value: "DRAFT",
        },
        UNDER_INVESTIGATION: {
            value: "UNDER_INVESTIGATION",
        },
        RESOLVED: {
            value: "RESOLVED"
        },
        REJECTED: {
            value: "REJECTED"
        }
    },
});

const IncidentTypes  = `
    type Incident {
        _id: String!
        type: String!,
        status: String!
        comment: String!
        longitude: Float!
        latitude: Float!
        userId: String!
        media: [String]!
    }

    enum IncidentType {
        RED_FLAG
        INTERVENTION
    }

    enum IncidentStatus {
        DRAFT
        UNDER_INVESTIGATION
        RESOLVED
        REJECTED
    }

    type Query {
        incident(id: String!): Incident
        incidents(type: String): [Incident]!
        personalIncidents(type: String): [Incident]!
    }

    type Mutation {
        reportIncident(type: IncidentType!, status: IncidentStatus!,
            comment: String!, longitude: Float!, latitude: Float!,
            videos: [String] = [], images: [String] = []): Incident
        updateIncident(id: String!, type: IncidentType, status: IncidentStatus,
            comment: String, longitude: Float, latitude: Float): Incident
        addIncidentMedia(id: String!, mediaId: String!, videos: [String!],
            images: [String!]): Incident
        deleteIncident(id: String!): Incident
        deleteIncidentMedia(id: String!, mediaId: String!): Incident
    }
`;

export default IncidentTypes;
