import { GetStaticProps } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { NextSeo } from 'next-seo'
import { productQuery } from '../../../libs/query'
import { sanityStaticProps, useSanityQuery } from '../../../utils/sanity'
import { Layout } from '../../components/common/Layout/Layout'
import { Home } from '../../components/product/Home/Home'
import { RelatedProducts } from '../../components/product/Home/RelatedProducts'
import { sanity } from '../../../utils/sanity'
import { openGraphImages } from '../../../libs/helpers'

const pathsQuery = groq`*[_type == 'product']{slug}`

export const getStaticPaths = async () => {
    const slugs = await sanity.sanityClient('anonymous').fetch(pathsQuery)

    return {
        paths: slugs
            .filter((s: any) => s)
            .map((s: any) => ({ params: { product: s.slug.current } })),
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context) => ({
    props: await sanityStaticProps({ query: productQuery, context }),
    revalidate: 10,
})

export default function Product(props: SanityProps) {
    const {
        data: { site, product },
    } = useSanityQuery(productQuery, props)

    return (
        <Layout {...site}>
            <NextSeo
                title={product.title}
                description={product.body[0].children[0].text}
                openGraph={{
                    images: openGraphImages({ img: product.mainImage }),
                }}
            />
            <Home {...product} />
            <RelatedProducts products={product.related_product} />
        </Layout>
    )
}
