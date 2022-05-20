import { DatabaseContext } from '../instance';

export default {
    identifier: '08_addLife',

    async up({ regular: { db } }: DatabaseContext): Promise<void> {
        // ensure that compound index on firstName and lastName fields are unique
        await db.collection('lives').createIndex({ firstName: 1, lastName: 1 }, { unique: true });
    },
};
