import { GetStaticProps } from 'next'
import { SanityProps } from 'next-sanity-extra'
// import { imageUrlBuilder, sanityStaticProps, useSanityQuery } from '../../utils/sanity'
// import { NextSeo } from 'next-seo'
// import { renderObjectArray } from 'sanity-react-extra'
// import { Home } from '../../components/Home/Home'
// import { Layout } from '../components/common/Layout/Layout'
// import { Policy } from '../components/Home/Policy'
// import { Reviews } from '../components/Home/Reviews'
// import { SanityImg } from 'sanity-react-extra'
// import { LatestProducts } from '../components/Home/LatestProducts'
// import { DealsAndOffers } from '../components/Home/DealsAndOffers'
// import { Newsletter } from '../components/Home/Newletter'
// import { useEffect } from 'react'
// import { useAppDispatch } from '../store/hooks'
// import { ADD_ALL_PRODUCTS } from '../store/product'
import { sanity, sanityStaticProps, useSanityQuery } from '../../../utils/sanity'
import { orderQuery } from '../../../libs/query'
import groq from 'groq'
import { Layout } from '../../components/common/Layout/Layout'
import { renderObjectArray } from 'sanity-react-extra'
import Container from '../../ui/container'
import { OrderInformation } from '../../components/order/order-information'
import { Newsletter } from '../../components/Home/Newletter'

const pathsQuery = groq`*[_type == "order"]{_id}`

export const getStaticPaths = async () => {
    const ids = await sanity.sanityClient('anonymous').fetch(pathsQuery)

    return {
        paths: ids.filter((s: any) => s).map((s: any) => ({ params: { order: s._id } })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => ({
    props: await sanityStaticProps({ query: orderQuery, context }),
    revalidate: 10,
})

function OrderPage(props: SanityProps) {
    const {
        data: { site, order },
    } = useSanityQuery(orderQuery, props)

    return (
        <Layout {...site}>
            <Container className="mt-24">
                <OrderInformation order={order} />
                {/* <Newsletter /> */}
            </Container>
        </Layout>
    )
}

export default OrderPage
