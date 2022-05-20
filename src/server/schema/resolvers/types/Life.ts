import { GraphQLLifeResolvers } from '../definitions';

const LifeGraphQL: GraphQLLifeResolvers = {
    id: root => root._id,
    fullName: root => {
        const fullName = `${root.firstName} ${root.lastName}`;

        return fullName;
    },
};

export default LifeGraphQL;
