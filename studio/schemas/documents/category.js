import { CgOptions } from 'react-icons/cg'

export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    icon: CgOptions,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
            hidden: true,
        },
        {
            name: 'parents',
            title: 'Parent categories',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'category' }],
                },
            ],
        },
    ],
}
