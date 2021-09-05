import { GetStaticProps } from 'next'
import { SanityProps } from 'next-sanity-extra'
import { homeQuery } from '../../libs/query'
import { imageUrlBuilder, sanityStaticProps, useSanityQuery } from '../../utils/sanity'
import { NextSeo } from 'next-seo'
import { renderObjectArray } from 'sanity-react-extra'
import { Home } from '../components/Home/Home'
import { Layout } from '../components/common/Layout/Layout'
import { Policy } from '../components/Home/Policy'
import { Reviews } from '../components/Home/Reviews'
import { SanityImg } from 'sanity-react-extra'
import { LatestProducts } from '../components/Home/LatestProducts'
import { DealsAndOffers } from '../components/Home/DealsAndOffers'
import { Newsletter } from '../components/Home/Newletter'
import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { ADD_ALL_PRODUCTS } from '../store/product'
import { openGraphImages } from '../../libs/helpers'

export const getStaticProps: GetStaticProps = async (context) => ({
    props: await sanityStaticProps({ query: homeQuery, context }),
    revalidate: 10,
})

function IndexPage(props: SanityProps) {
    const {
        data: {
            site,
            landingPage: { seo, screens, poster },
            latestProduct,
            offer,
            bestSeller,
            special,
            deals,
            allProducts,
        },
    } = useSanityQuery(homeQuery, props)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(ADD_ALL_PRODUCTS(allProducts))
    }, [])

    return (
        <Layout {...site}>
            <NextSeo
                title={seo.title}
                description={seo.description}
                openGraph={{
                    images: openGraphImages({ img: seo.seoImage }),
                }}
            />
            {renderObjectArray(screens, {
                'landing.home': Home,
                'landing.policy': Policy,
            })}
            <DealsAndOffers special={special} offer={offer} bestSeller={bestSeller} deals={deals} />
            <SanityImg
                className="lg:max-h-[350px] lg:h-auto h-28  cursor-pointer"
                builder={imageUrlBuilder}
                image={poster}
                height={550}
            />
            <LatestProducts latestProduct={latestProduct} />
            {renderObjectArray(screens, {
                'landing.reviews': Reviews,
                'landing.newslatter': Newsletter,
            })}
        </Layout>
    )
}

export default IndexPage
