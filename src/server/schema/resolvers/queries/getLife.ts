import { getDatabaseContext } from '../../../database';
import { GraphQLQueryResolvers } from '../definitions';

const query: GraphQLQueryResolvers['getLife'] = async (root, { id }) => {
    const { collections } = await getDatabaseContext();
    const life = collections.lives.findOne({
        // match life ID with arg provided
        _id: id,
    });
    if (!life) {
        // no match
        return null;
    }

    return life;
};

export default query;
