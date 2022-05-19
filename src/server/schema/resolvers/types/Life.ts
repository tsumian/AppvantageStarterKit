import { GraphQLLifeResolvers } from '../definitions';

const LifeGraphQL: GraphQLLifeResolvers = {
    _id: root => root._id,
    birthday: root => root.birthday,
    description: root => root.description,
    firstName: root => root.firstName,
    lastName: root => root.lastName,
    fullName: root => {
        const fullName = root.firstName + root.lastName;

        return fullName;
    },
    title: root => root.title,
    hobbies: root => root.hobbies,
};

export default LifeGraphQL;
