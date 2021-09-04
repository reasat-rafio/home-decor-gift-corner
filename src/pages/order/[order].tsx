import { GetStaticProps } from 'next'
import { SanityProps } from 'next-sanity-extra'
import { sanity, sanityStaticProps, useSanityQuery } from '../../../utils/sanity'
import { orderQuery } from '../../../libs/query'
import groq from 'groq'
import { Layout } from '../../components/common/Layout/Layout'
import Container from '../../ui/container'
import { OrderInformation } from '../../components/order/order-information'

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
            <Container className="mt-16">
                <OrderInformation order={order} />
                {/* <Newsletter /> */}
            </Container>
        </Layout>
    )
}

export default OrderPage
