import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectProduct } from '../../store/product'
import { CheckoutItem } from './CheckoutItem'

interface CheckoutCardProps {}

export const CheckoutCard: React.FC<CheckoutCardProps> = ({}) => {
    const { inCartProducts } = useAppSelector(selectProduct)

    // items subtotal
    const [subTotal, setSubTotal] = useState<number>(0)
    //  doing the sum of the items price
    useEffect(() => {
        if (inCartProducts?.length) {
            const _subtotal = inCartProducts.reduce(
                (result: number, { price, quantity }) => result + price * quantity,
                0,
            )
            setSubTotal(_subtotal)
        } else {
            setSubTotal(0)
        }
    }, [inCartProducts])

    const checkoutFooter = [
        {
            id: 1,
            name: 'Subtotal',
            price: subTotal,
        },
        {
            id: 2,
            name: 'Shipping',
            price: inCartProducts.length ? 60 : 0,
        },
        {
            id: 3,
            name: 'Total',
            price: inCartProducts.length ? subTotal + 60 : 0,
        },
    ]

    return (
        <div className="pt-12 md:pt-0 2xl:ps-4">
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                Your Order
            </h2>
            <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
                <span>Product</span>
                <span className="ms-auto flex-shrink-0">Subtotal</span>
            </div>
            {inCartProducts?.length ? (
                inCartProducts.map((item, idx) => <CheckoutItem item={item} key={idx} />)
            ) : (
                <p className="text-red-500 lg:px-3 py-4">Your cart is empty.</p>
            )}
            {checkoutFooter.map((item: any) => (
                <div
                    key={item.id}
                    className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0"
                >
                    {item.name}
                    <span className="ms-auto flex-shrink-0">{item.price}</span>
                </div>
            ))}
        </div>
    )
}
