import { GetStaticProps } from 'next'
import { SanityProps } from 'next-sanity-extra'
import { NextSeo } from 'next-seo'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useState } from 'react'
import { shopQuery } from '../../../libs/query'
import { ProductsProps } from '../../../libs/types/shopTypes'
import { sanityStaticProps, useSanityQuery } from '../../../utils/sanity'
import { Layout } from '../../components/common/Layout/Layout'
import { FilterSideMenu } from '../../components/shop/FilterSection/FilterSideMenu'
import { TopMenu } from '../../components/shop/FilterSection/TopMenu'
import { Products } from '../../components/shop/Products'
import { SmFilterDropDown } from '../../components/shop/FilterSection/SmFilterDropDown'
import { CategorySideMenu } from '../../components/common/SideMenus/CategorySideMenu'

export const getStaticProps: GetStaticProps = async (context) => ({
    props: await sanityStaticProps({ query: shopQuery, context }),
    revalidate: 10,
})

export default function IndexShop(props: SanityProps) {
    const {
        data: { site, category, products },
    } = useSanityQuery(shopQuery, props)

    const sorts = ['Name (A - Z)', 'Name (Z - A)', 'Price (Low - High)', 'Price (High - Low)']
    const [sortedProducts, setSortedProducts] = useState<ProductsProps[]>(products)
    const [selectedSort, setSelectedSort] = useState<string | null>(sorts[0])
    const [grid, setGrid] = useState(4)
    const [selectedAvailability, setSelectAvailability] = useState('In Stock')

    useEffect(() => {
        let filterByAvailabilityProducts = products.filter(
            (pd: ProductsProps) => pd.availbility === selectedAvailability,
        )
        setSortedProducts(filterByAvailabilityProducts)
    }, [selectedAvailability])

    return (
        <Layout {...site}>
            <NextSeo
                title="Home Decor And Gift Center | Shop"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc egestas euismod sem eu volutpat. Sed quis ultricies nulla. Sed convallis, ex quis luctus ultricies, risus eros gravida turpis, id varius risus velit quis mauris."
            />

            <section className="bg-antiFlashWhite py-section w-screen">
                <div className="section lg:grid lg:grid-cols-12 lg:gap-10">
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
                                selectedSort={selectedSort as string}
                                setSelectedSort={
                                    setSelectedSort as Dispatch<SetStateAction<string>>
                                }
                                grid={grid}
                                setGrid={setGrid}
                                sorts={sorts}
                            />
                        </div>

                        <div className="block lg:hidden">
                            <SmFilterDropDown
                                sorts={sorts}
                                selectedSort={selectedSort as string}
                                setSelectedSort={
                                    setSelectedSort as Dispatch<SetStateAction<string>>
                                }
                            />
                        </div>

                        <Products
                            products={sortedProducts}
                            selectedSort={selectedSort as string}
                            grid={grid}
                        />
                    </div>
                </div>
            </section>
            <CategorySideMenu category={category} />
        </Layout>
    )
}
