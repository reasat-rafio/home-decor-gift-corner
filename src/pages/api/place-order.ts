import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'
import { previewClient } from '../../../utils/sanity'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function PlaceOrder(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const session = getSession(req, res)
    const user = session?.user

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
        // Saving the user to the database
        const newUser = await previewClient.create({
            _type: 'users',
            name: user?.name,
            email: user?.email,
            nickname: user?.nickname,
            picture: user?.picture,
        })

        console.log('===============newUser=====================')
        console.log(newUser)
        console.log('=============newUser=======================')

        const result = await previewClient.create({
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

        return res.json({ result })
    } catch (error) {
        return res.status(500).json({ message: `Couldn't submit comment`, error })
    }
})
