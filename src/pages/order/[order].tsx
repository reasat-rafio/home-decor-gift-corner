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

import { sanityStaticProps, useSanityQuery } from '../../../utils/sanity'
import { orderQuery } from '../../../libs/query'

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            props: await sanityStaticProps({ query: orderQuery, context }),
            revalidate: 10,
        },
    }
}

function IndexPage(props: SanityProps) {
    const {
        data: { site },
    } = useSanityQuery(orderQuery, props)
    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(ADD_ALL_PRODUCTS(allProducts))
    // }, [])

    return (
        // <Layout {...site}>
        //     <NextSeo title={seo.title} description={seo.description} />
        //     {renderObjectArray(screens, {
        //         'landing.home': Home,
        //         'landing.policy': Policy,
        //     })}
        //     <DealsAndOffers special={special} offer={offer} bestSeller={bestSeller} deals={deals} />

        //     <SanityImg
        //         className="max-h-[350px] cursor-pointer"
        //         builder={imageUrlBuilder}
        //         image={poster}
        //         height={550}
        //     />
        //     <LatestProducts latestProduct={latestProduct} />
        //     {renderObjectArray(screens, {
        //         'landing.reviews': Reviews,
        //         'landing.newslatter': Newsletter,
        //     })}
        // </Layout>

        <div>asdasd</div>
    )
}

export default IndexPage
