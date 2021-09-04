import { GetStaticProps } from 'next'
import { SanityProps } from 'next-sanity-extra'
import React from 'react'
import { checkoutQuery } from '../../libs/query'
import { sanityStaticProps, useSanityQuery } from '../../utils/sanity'
import { CheckoutCard } from '../components/checkout/CheckoutCard'
import { CheckoutForm } from '../components/checkout/CheckoutForm'
import { Layout } from '../components/common/Layout/Layout'
import Container from '../ui/container'

export const getStaticProps: GetStaticProps = async (context) => ({
    props: await sanityStaticProps({ query: checkoutQuery, context }),
    revalidate: 10,
})

export default function checkout(props: SanityProps) {
    const {
        data: { site },
    } = useSanityQuery(checkoutQuery, props)

    return (
        <Layout {...site}>
            <Container className="mt-16">
                <div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
                    <div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
                        <CheckoutForm />
                    </div>
                    <div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
                        <CheckoutCard />
                    </div>
                </div>
            </Container>
        </Layout>
    )
}
