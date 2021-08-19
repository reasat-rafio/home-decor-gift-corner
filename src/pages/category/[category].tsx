import { GetStaticProps } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { NextSeo } from 'next-seo'
import { categoryQuery } from '../../../libs/query'
import { sanityClient, sanityStaticProps, useSanityQuery } from '../../../utils/sanity'
import { Layout } from '../../components/common/Layout/Layout'
import { Home } from '../../components/product/Home/Home'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ProductsProps } from '../../../libs/types/shopTypes'
import { FilterSideMenu } from '../../components/shop/FilterSection/FilterSideMenu'
import { TopMenu } from '../../components/shop/FilterSection/TopMenu'
import { SmFilterDropDown } from '../../components/shop/FilterSection/SmFilterDropDown'
import { Products } from '../../components/shop/Products'
import { CategorySideMenu } from '../../components/common/SideMenus/CategorySideMenu'

const pathsQuery = groq`*[_type == "category"]{slug}`

export const getStaticPaths = async () => {
    const slugs = await sanityClient('anonymous').fetch(pathsQuery)

    return {
        paths: slugs
            .filter((s: any) => s)
            .map((s: any) => ({ params: { category: s.slug.current } })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => ({
    props: await sanityStaticProps({ query: categoryQuery, context }),
    revalidate: 10,
})

export default function Category(props: SanityProps) {
    const {
        data: { site, products, category },
    } = useSanityQuery(categoryQuery, props)

    const router = useRouter()

    const sorts = ['Name (A - Z)', 'Name (Z - A)', 'Price (Low - High)', 'Price (High - Low)']

    const [sortedProducts, setSortedProducts] = useState<ProductsProps[]>(products)
    const [selectedSort, setSelectedSort] = useState<string | null>(sorts[0])
    const [grid, setGrid] = useState(4)
    const [selectedAvailability, setSelectAvailability] = useState('In Stock')
    const [queryName, setQueryName] = useState<string | string[] | undefined>('')

    useEffect(() => {
        if (Object.keys(router.query).length !== 0) {
            const queryParams = router.query.category
            setQueryName(queryParams)
        }
    }, [queryName, router.query.category])

    useEffect(() => {
        let filterByAvailabilityProducts = products.filter(
            (pd: ProductsProps) => pd.availbility === selectedAvailability,
        )
        setSortedProducts(filterByAvailabilityProducts)
    }, [selectedAvailability, products])

    return (
        <Layout {...site}>
            <NextSeo
                title={`CATEGORY | ${queryName}`}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc egestas euismod sem eu volutpat. Sed quis ultricies nulla. Sed convallis, ex quis luctus ultricies, risus eros gravida turpis, id varius risus velit quis mauris"
            />
            <section className="bg-antiFlashWhite py-section w-screen">
                <div className="section lg:grid lg:grid-cols-12 lg:gap-10 ">
                    <div className="lg:col-span-3 xl:col-span-2 hidden lg:block">
                        <FilterSideMenu
                            category={category}
                            setSelectAvailability={setSelectAvailability}
                            selectedAvailability={selectedAvailability}
                        />
                    </div>

                    <div className="col-span-12 lg:col-span-9 xl:col-span-10 ">
                        <div className="hidden lg:block">
                            <TopMenu
                                selectedSort={selectedSort}
                                setSelectedSort={setSelectedSort}
                                grid={grid}
                                setGrid={setGrid}
                                sorts={sorts}
                            />
                        </div>

                        <div className="block lg:hidden">
                            <SmFilterDropDown
                                sorts={sorts}
                                selectedSort={selectedSort}
                                setSelectedSort={setSelectedSort}
                            />
                        </div>

                        <Products
                            products={sortedProducts}
                            selectedSort={selectedSort}
                            grid={grid}
                        />
                    </div>
                </div>
            </section>
            <CategorySideMenu category={category} />
        </Layout>
    )
}
