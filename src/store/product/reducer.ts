import { createReducer } from '@reduxjs/toolkit'
import { ProductsProps } from '../../../libs/types/shopTypes'

import {
    ADD_FIRST_ITEM,
    ADD_TO_THE_CART,
    PLUS_QUANTITY,
    MINUS_QUANTITY,
    ADD_ITEM,
    REMOVE_ITEM,
    CONFIRM_ORDER,
    ADD_ALL_PRODUCTS,
} from './actions'

export interface IProductsProps extends ProductsProps {
    quantity: number
}

interface ProductState {
    inCartProducts: IProductsProps[]
    allProducts: IProductsProps[]
}

const initialState: ProductState = {
    inCartProducts: [],
    allProducts: [],
}

export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ADD_TO_THE_CART, (state, action) => {
            state.inCartProducts = [...state.inCartProducts, action.payload]
        })
        .addCase(ADD_ALL_PRODUCTS, (state, action) => {
            state.allProducts = action.payload
        })

        .addCase(REMOVE_ITEM, (state, action) => {
            const filtedCard = state.inCartProducts.filter(({ title }) => title !== action.payload)
            state.inCartProducts = filtedCard
        })
        .addCase(PLUS_QUANTITY, (state, action) => {
            const findTheItem = state.inCartProducts.filter(
                (product) => product.title === action.payload.title,
            )
            findTheItem[0].quantity = findTheItem[0].quantity + action.payload.quantity
        })
        .addCase(CONFIRM_ORDER, () => initialState)
})
