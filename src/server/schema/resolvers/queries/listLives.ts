import { getDatabaseContext } from '../../../database';
import { GraphQLQueryResolvers } from '../definitions';

const query: GraphQLQueryResolvers['listLives'] =  async () => {
    const { collections } = await getDatabaseContext();
    // get array with all lives
    const lives = collections.lives.find({}).toArray();
    return lives;
}

export default query;