import { GetStaticProps } from 'next'
import { SanityProps } from 'next-sanity-extra'
import { sanity, sanityStaticProps, useSanityQuery } from '../../../utils/sanity'
import { orderQuery } from '../../../libs/query'
import groq from 'groq'
import { Layout } from '../../components/common/Layout/Layout'
import Container from '../../ui/container'
import { OrderInformation } from '../../components/order/order-information'
import { Newsletter } from '../../components/common/newsletter'
import { NextSeo } from 'next-seo'

const pathsQuery = groq`*[_type == "order"]{_id}`

export const getStaticPaths = async () => {
    const ids = await sanity.sanityClient('anonymous').fetch(pathsQuery)

    return {
        paths: ids.filter((s: any) => s).map((s: any) => ({ params: { order: s._id } })),
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context) => ({
    props: await sanityStaticProps({ query: orderQuery, context }),
    revalidate: 10,
})

function OrderPage(props: SanityProps) {
    const {
        data: { site, order, newslatter },
    } = useSanityQuery(orderQuery, props)

    return (
        <Layout {...site}>
            <NextSeo title="Orders | Home Decor And Gift Corner" />
            <Container className="mt-16">
                <OrderInformation order={order} />
                <Newsletter newsletter={newslatter} />
            </Container>
        </Layout>
    )
}

export default OrderPage
