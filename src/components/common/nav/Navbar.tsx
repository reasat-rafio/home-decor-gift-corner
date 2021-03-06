import clsx from 'clsx'
import React, { useState } from 'react'
import { useWindowScroll, useWindowSize } from '../../../../libs/hooks'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from '../../../../utils/sanity'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { useAppSelector } from '../../../store/hooks'
import { IProductsProps, selectProduct } from '../../../store/product'

import { Icon } from './Icon'
import { SearchResult } from '../SearchResult'

interface NavbarProps {
    logo: Image
    menu: NavMenu[]
}

export const Navbar: React.FC<NavbarProps> = ({ logo, menu }) => {
    const router = useRouter()
    const scroll = useWindowScroll()?.y ?? 0
    const windowWidth = useWindowSize()?.width ?? 0
    const [searchResult, setSearchResult] = useState<IProductsProps[]>([])
    const { allProducts } = useAppSelector(selectProduct)
    const [searchInput, setSearchInput] = useState<string | null>(null)

    const seachFilterAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
        const filteredItems = allProducts
            .filter((item) => item.title.includes(e.target.value))
            .slice(0, 10)
        setSearchResult(filteredItems)
    }

    return (
        <div className="fixed w-full top-0 z-40">
            <div
                className={clsx(
                    'w-full py-2  transition-all duration-300 ease-out z-50 bg-brown lg:px-10 px-4',
                    scroll ? 'shadow-lg opacity-100' : 'bg-opacity-100',
                )}
            >
                <nav className="flex w-full">
                    <div className="flex items-center w-full flex-1 lg:space-x-14 md:space-x-8 space-x-4">
                        <a href="/">
                            <SanityImg
                                className={clsx(
                                    'transition-all w-auto',
                                    windowWidth >= 1024
                                        ? scroll
                                            ? 'h-16'
                                            : 'h-20'
                                        : scroll
                                        ? 'h-14'
                                        : 'h-16',
                                )}
                                builder={imageUrlBuilder}
                                image={logo}
                                height={100}
                            />
                        </a>

                        <ul className="space-x-2 lg:flex hidden">
                            {menu.map((men, index) => (
                                <li key={index}>
                                    <Link href={men.href}>
                                        <a
                                            className={clsx(
                                                ' rounded-full lg:py-2 lg:px-5 py-1 px-3 text-sm font-semibold hover:bg-yellow hover:text-black transition-colors duration-200',
                                                router.pathname === men.href
                                                    ? 'bg-yellow text-black'
                                                    : 'text-white',
                                            )}
                                        >
                                            {men.title}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Icon seachFilterAction={seachFilterAction} />
                </nav>
            </div>

            <AnimatePresence>
                {searchInput && (
                    <SearchResult searchResult={searchResult} setSearchInput={setSearchInput} />
                )}
            </AnimatePresence>
        </div>
    )
}
