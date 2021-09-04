import { GrContactInfo } from 'react-icons/gr'

export default {
    name: 'contactInfos',
    type: 'object',
    title: 'Contact Info',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            media: 'icon',
        },
    },
}
