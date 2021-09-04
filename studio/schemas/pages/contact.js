import { GrContactInfo } from 'react-icons/gr'

export default {
    name: 'contact',
    type: 'document',
    title: 'Contact',
    icon: GrContactInfo,

    fields: [
        {
            name: 'seo',
            title: 'SEO',
            type: 'seo',
        },
        {
            name: 'contactUs',
            type: 'object',
            title: 'Contact US',
            fields: [
                {
                    name: 'titile',
                    title: 'Title',
                    type: 'string',
                },
                {
                    name: 'info',
                    title: 'Infos',
                    type: 'array',
                    of: [{ type: 'contactInfos' }],
                },

                {
                    name: 'locationImage',
                    title: 'Location',
                    type: 'image',
                },
            ],
        },
    ],
}
