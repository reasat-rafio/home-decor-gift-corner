import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'
import { previewClient } from '../../../utils/sanity'

export default async function createComment(req: NextApiRequest, res: NextApiResponse) {
    const {
        name,
        email,
        phone,
        tracking,
        address,
        note,
        zipcode,
        total,
        orderPlacedAt,
        orderedProducts,
    } = JSON.parse(req.body)

    try {
        await previewClient.create({
            _type: 'order',
            name,
            email,
            phone,
            tracking,
            address,
            note,
            zipCode: zipcode,
            total,
            orderPlacedAt,
            orderedProducts: orderedProducts.map((_product: any) => {
                const value = {
                    product: { _ref: _product.id, _type: 'reference' },
                    quantity: _product.qty,
                    _key: uuidv4(),
                }
                return value
            }),
        })

        // console.log(
        //     name,
        //     email,
        //     phone,
        //     tracking,
        //     address,
        //     note,
        //     zipcode,
        //     total,
        //     orderPlacedAt,
        //     orderedProducts,
        // )
    } catch (error) {
        return res.status(500).json({ message: `Couldn't submit comment`, error })
    }
    return res.status(200).json({ message: 'Order submitted' })
}
