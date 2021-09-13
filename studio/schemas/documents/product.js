import { MdLocalDrink } from 'react-icons/md'

export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    icon: MdLocalDrink,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            require: true,
        },
        {
            title: 'Main image',
            name: 'mainImage',
            type: 'image',
            require: true,
            options: {
                hotspot: true,
            },
        },

        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        },

        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }],
        },

        {
            name: 'brand',
            title: 'Brand',
            type: 'reference',
            to: { type: 'brand' },
        },

        {
            title: 'Availbility',
            name: 'availbility',
            type: 'string',
            require: true,
            options: {
                list: [
                    { title: 'In Stock', value: 'In Stock' },
                    { title: 'Pre Order', value: 'Pre Order' },
                    { title: 'Up Coming', value: 'Up Coming' },
                ],
                layout: 'radio',
            },
        },

        {
            title: 'Weight in grams',
            description: "Ignore this if product doesn't need to mention the weight",
            name: 'grams',
            type: 'number',
        },
        {
            title: 'Regular Price',
            name: 'price',
            type: 'number',
            require: true,
        },
        {
            title: 'Offer Price',
            description: 'Ignore this if there is no offer going on',
            name: 'offer_price',
            type: 'number',
        },

        {
            title: 'Tags',
            name: 'tags',
            type: 'array',
            require: true,
            of: [
                {
                    title: 'Choose Associated Tag',
                    type: 'reference',
                    description: 'If the your choice of tag is not available, create from Blog Tag',
                    to: { type: 'tags' },
                },
            ],
        },

        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            require: true,
            of: [
                {
                    type: 'reference',
                    to: { type: 'category' },
                },
            ],
        },
        {
            name: 'deals',
            title: 'Deals',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: { type: 'deal' },
                },
            ],
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            require: true,
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
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'availbility',
            media: 'mainImage',
        },
    },
}
