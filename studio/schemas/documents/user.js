import { FaUserAlt } from 'react-icons/fa'

export default {
    name: 'users',
    title: 'Users',
    icon: FaUserAlt,
    type: 'document',
    fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'picture', type: 'image', title: 'Picture' },
        { name: 'nickname', type: 'string', title: 'Nick Name' },
        {
            title: 'Order List',
            name: 'orderList',
            type: 'reference',
            to: [{ type: 'order' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
            media: 'picture',
        },
    },
}
