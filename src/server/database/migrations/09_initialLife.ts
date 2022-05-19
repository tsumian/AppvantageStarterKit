import { ObjectId } from 'mongodb';
import { DatabaseContext } from '../instance';

type Life = {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    birthday: Date;
    title: string;
    description: string;
    hobbies: string[];
};

export default {
    identifier: '09_initialLife',

    async up({ regular: { db } }: DatabaseContext): Promise<void> {
        await db.collection<Life>('lives').insertOne({
            _id: new ObjectId(),
            firstName: 'John',
            lastName: 'Doe',
            birthday: new Date('1999-05-26'),
            title: 'Queen',
            description: 'The Queen',
            hobbies: ['Badminton'],
        });
    },
};
