export interface OrderInfo {
    _createdAt: Date
    _id: string
    _rev: string
    _type: string
    _updatedAt: Date
    address: string
    email: string
    name: string
    note: string
    orderBy: OrderBy
    orderPlacedAt: string
    orderedProducts: OrderedProduct[]
    phone: string
    total: number
    tracking: string
    zipCode: string
}

export interface OrderBy {
    _ref: string
    _type: string
}

export interface OrderedProduct {
    _key: string
    product: Product
    quantity: number
}

export interface Product {
    offer_price: number
    price: number
    title: string
}
