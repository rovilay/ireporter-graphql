import { mergeResolvers } from 'merge-graphql-schemas';

import UserResolver from './User';
import IncidentResolver from './Incident';

const resolvers = [UserResolver, IncidentResolver];

export default mergeResolvers(resolvers, { all: true })
