import { FiShoppingCart } from 'react-icons/fi'

export default {
    name: 'orderedProduct',
    title: 'Ordered Product',
    type: 'object',
    icon: FiShoppingCart,
    fields: [
        {
            name: 'product',
            type: 'reference',
            to: [{ type: 'product' }],
        },

        {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
            // readOnly: true,
        },
    ],
    select: {
        title: 'product.title',
        media: 'product.mainImage',
    },
}
