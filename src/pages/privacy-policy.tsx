import { GetStaticProps } from 'next'
import { SanityProps } from 'next-sanity-extra'
import React from 'react'
import { privacyPoliciesQuery } from '../../libs/query'
import { PortableText, sanityStaticProps, useSanityQuery } from '../../utils/sanity'
import { Layout } from '../components/common/Layout/Layout'
import Container from '../ui/container'

export const getStaticProps: GetStaticProps = async (context) => ({
    props: await sanityStaticProps({ query: privacyPoliciesQuery, context }),
    revalidate: 10,
})

export default function PrivacyPolicy(props: SanityProps) {
    const {
        data: { site, privacyPolicy },
    } = useSanityQuery(privacyPoliciesQuery, props)

    return (
        <Layout {...site}>
            <Container className="py-section !prose-yellow !max-w-none">
                <h4 className="section-title my-6 border-b border-gray-500 text-yellow py-3">
                    {privacyPolicy.title}
                </h4>
                <PortableText blocks={privacyPolicy.description} />
            </Container>
        </Layout>
    )
}
