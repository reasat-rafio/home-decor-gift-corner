import { GrServices } from 'react-icons/gr'

export default {
    name: 'termsAndServices',
    title: 'Terms And Services',
    type: 'document',
    icon: GrServices,
    fields: [
        {
            name: 'seo',
            title: 'SEO',
            type: 'seo',
        },
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
    ],
}
