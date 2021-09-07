import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { ProductsProps } from '../../../libs/types/shopTypes'
import { imageUrlBuilder } from '../../../utils/sanity'
import { SHOW_CART_SIDE_MENU } from '../../store/dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ADD_TO_THE_CART, PLUS_QUANTITY, selectProduct } from '../../store/product'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface CardProps {
    product: ProductsProps
}

export const Card: React.FC<CardProps> = ({ product }) => {
    const dispatch = useAppDispatch()
    const productsAddedInCart = useAppSelector(selectProduct)
    const _product = { ...product, quantity: 1 }
    const router = useRouter()

    const addToCartAction = ({ redirect }: { redirect?: boolean }) => {
        const doesExistInCart: boolean = productsAddedInCart.inCartProducts.some(
            (product) => product.title == _product.title,
        )

        doesExistInCart ? dispatch(PLUS_QUANTITY(_product)) : dispatch(ADD_TO_THE_CART(_product))
        redirect ? router.push('/checkout') : dispatch(SHOW_CART_SIDE_MENU())
    }

    return (
        <div
            className="bg-white rounded-xl p-3 !h-[500px] !overflow-visible grid grid-flow-col grid-rows-2 justify-center items-center"
            style={{ gridTemplateRows: 'repeat(9, minmax(0, 9fr))' }}
        >
            <Link href={`/product/${product.slug.current}`}>
                <a className="row-span-6 lg:row-span-7 h-full">
                    <SanityImg
                        builder={imageUrlBuilder}
                        image={product.mainImage}
                        width={400}
                        alt={product.title}
                        className="rounded-2xl hover:scale-110 transition-transform duration-150 object-cover h-full hover:drop-shadow-lg cursor-pointer"
                    />
                </a>
            </Link>
            <div className="row-span-3 lg:row-span-2 flex flex-col space-y-1 mt-4">
                <Link href={`/product/${product.slug.current}`}>
                    <a className="text-center font-medium text-base">{product.title}</a>
                </Link>

                {product.offer_price ? (
                    <p className="text-center">
                        <span className="text-sm line-through mx-2">
                            {product.price.toLocaleString()} ৳
                        </span>
                        <span className="text-yellow font-semibold ">
                            {product.offer_price.toLocaleString()} ৳
                        </span>
                    </p>
                ) : (
                    <span className="text-center text-yellow font-semibold">
                        {product.price.toLocaleString()} ৳
                    </span>
                )}

                <div className="grid grid-cols-12 justify-start items-center w-full gap-2">
                    <button
                        className="cardBtn"
                        onClick={() => addToCartAction({ redirect: false })}
                    >
                        ADD TO CART
                    </button>
                    <button className="cardBtn" onClick={() => addToCartAction({ redirect: true })}>
                        SHOP NOW
                    </button>
                </div>
            </div>
        </div>
    )
}
