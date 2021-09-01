import { createReducer } from '@reduxjs/toolkit'

import {
    LOADING_END,
    LOADING_START,
    HIDE_SEARCH_PAGE,
    HIDE_SIDE_MENU,
    SHOW_SEARCH_PAGE,
    SHOW_SIDE_MENU,
    SHOW_CART_SIDE_MENU,
    HIDE_CART_SIDE_MENU,
    CLEAR,
    SHOW_SHOP_CATEGORY_SIDE_MENU,
    HIDE_SHOP_CATEGORY_SIDE_MENU,
} from './actions'

interface DomState {
    isLoggedIn: boolean
    showSideMenu: boolean
    showSmSearchPage: boolean
    showShopCategorySideMenu: boolean
    isLoading: boolean
    showCartSideMenu: boolean
}

const initialState: DomState = {
    isLoggedIn: false,
    showSideMenu: false,
    showCartSideMenu: false,
    showSmSearchPage: false,
    isLoading: false,
    showShopCategorySideMenu: false,
}

export const domReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(SHOW_SEARCH_PAGE, (state) => {
            state.showSmSearchPage = true
        })
        .addCase(HIDE_SEARCH_PAGE, (state) => {
            state.showSmSearchPage = false
        })
        .addCase(SHOW_SIDE_MENU, (state) => {
            state.showSideMenu = true
        })
        .addCase(HIDE_SIDE_MENU, (state) => {
            state.showSideMenu = false
        })
        .addCase(SHOW_CART_SIDE_MENU, (state) => {
            state.showCartSideMenu = true
        })
        .addCase(HIDE_CART_SIDE_MENU, (state) => {
            state.showCartSideMenu = false
        })
        .addCase(SHOW_SHOP_CATEGORY_SIDE_MENU, (state) => {
            state.showShopCategorySideMenu = true
        })
        .addCase(LOADING_START, (state) => {
            state.isLoading = true
        })
        .addCase(LOADING_END, (state) => {
            state.isLoading = false
        })
        .addCase(CLEAR, () => initialState)
})
