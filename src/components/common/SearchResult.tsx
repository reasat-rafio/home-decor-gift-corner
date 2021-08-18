import clsx from 'clsx'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { useOutsideAlerter } from '../../../libs/hooks'
import { imageUrlBuilder } from '../../../utils/sanity'
import { IProductsProps } from '../../store/product'

interface SearchResultProps {
    searchResult: IProductsProps[]
    setSearchInput: Dispatch<SetStateAction<string | null>>
}

export const SearchResult: React.FC<SearchResultProps> = ({ searchResult, setSearchInput }) => {
    const sectionRef = useRef(null)
    const asd = useOutsideAlerter(sectionRef, { setState: setSearchInput })

    return (
        <div
            className="bg-white shadow-2xl max-h-80 xl:w-[40%] lg:w-[60%] ml-auto px-4 overflow-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-300 rounded-xl mt-2 mr-2 min-h-[100px]"
            ref={sectionRef}
        >
            <div className="grid gap-3">
                {searchResult?.length > 0 ? (
                    searchResult.map((item, index) => (
                        <a
                            href={`/product/${item.slug.current}`}
                            className={clsx(
                                'flex py-5 ',
                                searchResult.length !== index + 1 && 'border-b-2',
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
                                            {item.price.toLocaleString()} ৳
                                        </span>
                                        <span className="text-yellow">
                                            {item.offer_price.toLocaleString()} ৳
                                        </span>
                                    </p>
                                ) : (
                                    <span className="text-center text-yellow">
                                        {item.price.toLocaleString()} ৳
                                    </span>
                                )}
                            </div>
                        </a>
                    ))
                ) : (
                    <p className="m-auto text-xl font-semibold ">No item found</p>
                )}
            </div>
        </div>
    )
}
