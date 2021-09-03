import { FaUserAlt } from 'react-icons/fa'

export default {
    name: 'users',
    title: 'Users',
    icon: FaUserAlt,
    type: 'document',
    fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'picture', type: 'url', title: 'Picture' },
        { name: 'nickname', type: 'string', title: 'Nick Name' },
        { name: 'auth0Id', type: 'string', title: 'Auth0Id', readOnly: true },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
            media: 'picture',
        },
    },
}
