import { AiOutlineMail } from 'react-icons/ai'

export default {
    name: 'newslatter',
    title: 'News Latter',
    type: 'document',
    icon: AiOutlineMail,
    fields: [
        {
            name: 'headline',
            title: 'Headline',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        { name: 'ctaButton', title: 'CTA Button', type: 'string' },
    ],
    preview: {
        select: {
            title: 'headline',
            subtitle: 'description',
            media: 'icon',
        },
    },
}
