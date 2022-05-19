import { getOr, __ } from 'lodash/fp';
import { getDatabaseContext } from '../../../database';
import { GraphQLQueryResolvers } from '../definitions';

const query: GraphQLQueryResolvers['listLives'] = async () => {
    const { collections } = await getDatabaseContext();
    // get array with all lives
    const [{ metadata, items }] = await collections.lives
        .aggregate([
            __,
            {
                $facet: {
                    metadata: [{ $count: 'count' }],
                    items: [],
                },
            },
        ])
        .toArray();

    return { count: getOr(0, '[0].count', metadata), items };
};

export default query;
