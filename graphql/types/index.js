import { mergeTypes } from 'merge-graphql-schemas';

import UserType from './User';
import IncidentType from './Incident/index';

const types  = [UserType, IncidentType];

export default mergeTypes(types, { all: true });
