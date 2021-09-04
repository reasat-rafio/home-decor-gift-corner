import { IoCheckmarkCircle } from 'react-icons/io5'
import React from 'react'
import { OrderInfo } from '../../../libs/types/orderTypes'
import { OrderDetails } from './order-details'
// import usePrice from "@framework/product/use-price";

interface OrderInformationProps {
    order: OrderInfo
}

const liStyle = `text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0`

export const OrderInformation: React.FC<OrderInformationProps> = ({ order }) => {
    return (
        <div className="xl:px-32 2xl:px-44 3xl:px-56 py-16 lg:py-20">
            <div className="border border-gray-300 bg-gray-50 px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-heading text-sm md:text-base mb-6 lg:mb-8">
                <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <IoCheckmarkCircle className="w-5 h-5 text-green-600" />
                </span>
                <p>Thank you. Your order has been {order.tracking}</p>
            </div>

            <ul className="border border-gray-300 bg-gray-50 rounded-md flex flex-col md:flex-row mb-7 lg:mb-8 xl:mb-10">
                <li className={liStyle}>
                    <span className="uppercase text-[11px] block text-body font-normal leading-5">
                        ORDER NUMBER:
                    </span>
                    <p> {order._id}</p>
                </li>
                <li className={liStyle}>
                    <span className="uppercase text-[11px] block text-body font-normal leading-5">
                        DATE:
                    </span>
                    <p> {order.orderPlacedAt}</p>
                </li>
                <li className={liStyle}>
                    <span className="uppercase text-[11px] block text-body font-normal leading-5">
                        EMAIL:
                    </span>
                    <p>{order.email}</p>
                </li>
                <li className={liStyle}>
                    <span className="uppercase text-[11px] block text-body font-normal leading-5">
                        TOTAL:
                    </span>
                    <p> {order.total}</p>
                </li>
                <li className={liStyle}>
                    <span className="uppercase text-[11px] block text-body font-normal leading-5">
                        PAYMENT METHOD:
                    </span>
                    <p> cash on delivery</p>
                </li>
            </ul>

            <p className="text-heading text-sm md:text-base mb-8">Pay with cash upon delivery.</p>

            <OrderDetails order={order} />
        </div>
    )
}
