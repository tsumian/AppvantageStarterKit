import { ObjectId } from 'mongodb';
import { getDatabaseContext, Life } from '../../../database';
import { isDuplicateErrorOnFields } from '../../../utils';
import { InvalidInput } from '../../errors';
import { GraphQLMutationResolvers } from '../definitions';

const mutation: GraphQLMutationResolvers['createLife'] = async (root, { input }, { getTranslations }) => {
    const { collections } = await getDatabaseContext();
    const { t } = await getTranslations(['errors']);
    const document: Life = {
        _id: new ObjectId(),
        firstName: input.firstName,
        lastName: input.lastName,
        description: input.description,
        birthday: input.birthday,
        hobbies: input.hobbies,
        title: input.title,
    };

    try {
        await collections.lives.insertOne(document);
    } catch (error) {
        // check for duplicate full name
        if (isDuplicateErrorOnFields(error, 'fullName')) {
            throw new InvalidInput({ fullName: t('error:duplicateFullName') });
        }

        throw error;
    }

    return document;
};

export default mutation;
