import { FiShoppingCart } from 'react-icons/fi'

export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    icon: FiShoppingCart,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            // readOnly: true,
        },

        {
            name: 'address',
            title: 'Address',
            type: 'string',
            // readOnly: true,
        },
        {
            name: 'phone',
            title: 'Phone number',
            type: 'string',
            // readOnly: true,
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            // readOnly: true,
        },
        {
            name: 'zipCode',
            title: 'Zip Code',
            type: 'string',
            // readOnly: true,
        },

        {
            name: 'note',
            title: 'Note',
            type: 'text',
            // readOnly: true,
        },

        {
            name: 'orderPlacedAt',
            title: 'Ordedr Placed At',
            type: 'string',
            // readOnly: true,
        },

        {
            name: 'orderedProducts',
            title: 'Ordered Products',
            type: 'array',
            of: [{ type: 'orderedProduct' }],
        },

        {
            title: 'Tracking',
            name: 'tracking',
            type: 'string',
            options: {
                list: [
                    { title: 'Recived', value: 'Recived' },
                    { title: 'On The Way', value: 'On The Way' },
                    { title: 'Complete', value: 'Complete' },
                ],
                layout: 'radio',
            },
        },

        {
            name: 'total',
            title: 'Total',
            type: 'number',
            // readOnly: true,
        },
    ],

    preview: {
        select: {
            title: 'name',
            subtitle: 'tracking',
            //   media: "orderedProducts[0].",
        },
    },
}
