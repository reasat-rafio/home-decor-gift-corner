// OrderItem

import { useRouter } from 'next/router'
import { OrderedProduct, OrderInfo } from '../../../libs/types/orderTypes'

const OrderItemCard = ({ product }: { product: OrderedProduct }) => {
    const price = product.product.offer_price ? product.product.offer_price : product.product.price

    return (
        <tr className="border-b font-normal border-gray-300 last:border-b-0" key={product._key}>
            <td className="p-4">
                {product.product.title} * {product.quantity}
            </td>
            <td className="p-4">{price * product.quantity}</td>
        </tr>
    )
}
export const OrderDetails: React.FC<{ className?: string; order: OrderInfo }> = ({
    className = 'pt-10 lg:pt-12',
    order,
}) => {
    return (
        <div className={className}>
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                <p>Order details:</p>
            </h2>
            <table className="w-full text-heading font-semibold text-sm lg:text-base">
                <thead>
                    <tr>
                        <th className="bg-gray-150 p-4 text-left first:rounded-ts-md w-1/2">
                            <p>Product</p>
                        </th>
                        <th className="bg-gray-150 p-4 text-left last:rounded-te-md w-1/2">
                            <p>Total</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {order?.orderedProducts.map((product, index) => (
                        <OrderItemCard key={index} product={product} />
                    ))}
                </tbody>
                <tfoot>
                    <tr className="odd:bg-gray-150">
                        <td className="p-4 italic">Subtotal:</td>
                        <td className="p-4">{order.total - 100}</td>
                    </tr>
                    <tr className="odd:bg-gray-150">
                        <td className="p-4 italic">Delivery Charge:</td>
                        <td className="p-4">
                            100
                            <span className="text-[13px] font-normal ps-1.5 inline-block">
                                via Flat rate
                            </span>
                        </td>
                    </tr>
                    <tr className="odd:bg-gray-150">
                        <td className="p-4 italic">Payment method::</td>
                        <td className="p-4">cash on delivery</td>
                    </tr>
                    <tr className="odd:bg-gray-150">
                        <td className="p-4 italic">Total:</td>
                        <td className="p-4">{order.total}</td>
                    </tr>
                    <tr className="odd:bg-gray-150">
                        <td className="p-4 italic">Note::</td>
                        <td className="p-4">{order.note ? order.note : ''}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
