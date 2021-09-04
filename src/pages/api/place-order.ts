import { groq } from 'next-sanity'
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
        // finding the user
        const session = getSession(req, res)
        const userId = session?.user.sub

        const pathsQuery = groq`*[_type == "users" && auth0Id == "${userId}"][0]`
        const USER = await previewClient.fetch(pathsQuery)

        let _user
        if (!USER) {
            // Saving the user to the database
            _user = await previewClient.create({
                _type: 'users',
                name: user?.name,
                email: user?.email,
                nickname: user?.nickname,
                picture: user?.picture,
                auth0Id: user?.sub,
            })
        } else {
            _user = USER
        }

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
            orderBy: { _ref: _user._id, _type: 'reference' },
        })

        // Appending the order to the user profile
        await previewClient
            .patch(_user._id)
            .setIfMissing({ ordersList: [] })
            .append('ordersList', [{ _key: uuidv4(), _ref: result._id, _type: 'reference' }])
            .commit()

        return res.json({ result })
    } catch (error) {
        return res.status(500).json({ message: `Couldn't submit comment`, error })
    }
})
