import { getDatabaseContext } from '../../../database';
import { GraphQLQueryResolvers } from '../definitions';

const query: GraphQLQueryResolvers['getLife'] = async (root, { id }) => {
    const { collections } = await getDatabaseContext();
    return collections.lives.findOne({
        // match life ID with arg provided
        _id: id,
    });
};

export default query;
