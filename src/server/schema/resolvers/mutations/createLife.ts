import { ObjectId } from 'mongodb';
import { getDatabaseContext, Life } from '../../../database';
import { isDuplicateErrorOnFields } from '../../../utils';
import { InvalidInput } from '../../errors';
import { GraphQLMutationResolvers } from '../definitions';

const mutation: GraphQLMutationResolvers['createLife'] = async ( 
    root, 
    { firstName, lastName, description, title, birthday, hobbies },
    { getTranslations } 
) => {
    const { collections } = await getDatabaseContext();
    const { t } = await getTranslations(['errors']);

    const fullName = firstName + lastName;

    const document: Life = {
        _id: new ObjectId(),
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        description: description,
        birthday: birthday,
        hobbies: hobbies,
        title: title,
    }

    try {
        await collections.lives.insertOne(document)
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

