import { SiGnuprivacyguard } from 'react-icons/si'

export default {
    name: 'privacyPolicy',
    title: 'Privacy Policy',
    type: 'document',
    icon: SiGnuprivacyguard,
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
