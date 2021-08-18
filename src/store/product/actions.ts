import { createAction } from '@reduxjs/toolkit'
import { IProductsProps } from './reducer'

export const ADD_FIRST_ITEM = createAction('product/ADD_FIRST_ITEM')
export const ADD_ALL_PRODUCTS = createAction<IProductsProps[]>('product/ADD_ALL_PRODUCTS')
export const ADD_TO_THE_CART = createAction<IProductsProps>('product/ADD_TO_THE_CART')
export const PLUS_QUANTITY = createAction<IProductsProps>('product/PLUS_QUANTITY')
export const MINUS_QUANTITY = createAction('product/MINUS_QUANTITY')
export const ADD_ITEM = createAction('product/ADD_ITEM')
export const REMOVE_ITEM = createAction<string>('product/REMOVE_ITEM')
export const CONFIRM_ORDER = createAction('product/CONFIRM_ORDER')
