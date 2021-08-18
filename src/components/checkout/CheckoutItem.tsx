import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from '../../../utils/sanity'
import { IProductsProps } from '../../store/product'

interface CheckoutItemProps {
    item: IProductsProps
}

export const CheckoutItem: React.FC<CheckoutItemProps> = ({ item }) => {
    return (
        <div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
            <div className="flex border rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
                <SanityImg
                    builder={imageUrlBuilder}
                    image={item.mainImage}
                    alt={item.title}
                    width={100}
                    className="rounded mr-2 object-cover"
                />
            </div>
            <h6 className="text-sm ps-3 font-regular text-heading">{item.title}</h6>
            <div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
                ৳{item.price}
            </div>
        </div>
    )
}
