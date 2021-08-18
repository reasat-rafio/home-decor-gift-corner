import { motion, AnimatePresence } from 'framer-motion'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { HIDE_SEARCH_PAGE, selectDom } from '../../../store/dom'
import { searchPageVarients } from '../../../../libs/animation'
import { IProductsProps, selectProduct } from '../../../store/product'
import { imageUrlBuilder } from '../../../../utils/sanity'
import { SanityImg } from 'sanity-react-extra'
import clsx from 'clsx'

interface SmSearchPageProps {}

export const SmSearchPage: React.FC<SmSearchPageProps> = ({}) => {
    const { showSmSearchPage } = useAppSelector(selectDom)
    const dispatch = useAppDispatch()
    const [searchInput, setSearchInput] = useState<string | null>(null)
    const [searchFilterItems, setSearchFilterItems] = useState([])
    const { allProducts } = useAppSelector(selectProduct)
    const [searchResult, setSearchResult] = useState<IProductsProps[]>([])

    const seachFilterAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
        const filteredItems = allProducts
            .filter((item) => item.title.includes(e.target.value))
            .slice(0, 10)
        setSearchResult(filteredItems)
    }

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {showSmSearchPage && (
                    <motion.section
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={searchPageVarients}
                        className={'fixed min-h-screen  w-screen bg-white z-50 block overflow-auto'}
                    >
                        <div className="container mx-auto">
                            <div className="flex justify-end">
                                <span
                                    className="p-3 cursor-pointer"
                                    onClick={() => dispatch(HIDE_SEARCH_PAGE())}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 hover:scale-110 transition-all duration-150 hover:text-yellow"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </span>
                            </div>

                            <form className=" flex justify-center flex-col ">
                                <input
                                    type="text"
                                    className="border rounded-sm py-3 px-2 outline-none mx-auto  w-11/12  "
                                    onChange={seachFilterAction}
                                />

                                <div className=" my-2  flex justify-end font-title  overflow-auto">
                                    <ul className="w-full rounded-sm overflow-auto p-3 divide-y-2 shadow-md disable-scrollbars ">
                                        {searchResult?.length > 0 ? (
                                            searchResult.map((item, index) => (
                                                <Link href={`/product/${item.slug.current}`}>
                                                    <a
                                                        onClick={() => dispatch(HIDE_SEARCH_PAGE())}
                                                        className={clsx(
                                                            'flex py-5 ',
                                                            searchResult.length !== index + 1 &&
                                                                'border-b-2',
                                                        )}
                                                        key={index}
                                                    >
                                                        <SanityImg
                                                            builder={imageUrlBuilder}
                                                            image={item.mainImage}
                                                            alt={item.title}
                                                            width={70}
                                                            height={70}
                                                            className="rounded mr-2"
                                                        />
                                                        <div className="flex flex-col items-start justify-center">
                                                            <p>{item.title}</p>

                                                            {item.offer_price ? (
                                                                <p className="text-center">
                                                                    <span className="text-sm line-through mx-2">
                                                                        {item.price.toLocaleString()}{' '}
                                                                        ৳
                                                                    </span>
                                                                    <span className="text-yellow">
                                                                        {item.offer_price.toLocaleString()}{' '}
                                                                        ৳
                                                                    </span>
                                                                </p>
                                                            ) : (
                                                                <span className="text-center text-yellow">
                                                                    {item.price.toLocaleString()} ৳
                                                                </span>
                                                            )}
                                                        </div>
                                                    </a>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="flex ">
                                                Sorry, nothing found for
                                                <span className="font-semibold ml-2">
                                                    {searchInput}
                                                </span>
                                            </p>
                                        )}
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    )
}
