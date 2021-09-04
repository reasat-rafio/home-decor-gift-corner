import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import { searchbarVariants } from '../../../../libs/animation'
import { useWindowSize } from '../../../../libs/hooks'
import { SHOW_CART_SIDE_MENU, SHOW_SEARCH_PAGE, SHOW_SIDE_MENU } from '../../../store/dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectProduct } from '../../../store/product'
import { Menu, Transition } from '@headlessui/react'
import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'

interface IIcons {
    title: string
    url: string
    uniqueClasses?: string
}

export const Icon: React.FC<{
    seachFilterAction: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ seachFilterAction }) => {
    const dispatch = useAppDispatch()
    const windowWidth = useWindowSize()?.width ?? 0
    const { inCartProducts } = useAppSelector(selectProduct)
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false)

    const { user, isLoading } = useUser()

    const _icons: IIcons[] = [
        {
            title: 'search',
            url: '/static/svg/Search.svg',
            uniqueClasses: ' flex-center',
        },
        {
            title: 'cart',
            url: '/static/svg/Cart.svg',
            uniqueClasses: ' flex-center',
        },

        {
            title: 'menu',
            url: '/static/svg/Menu.svg',
            uniqueClasses: 'lg:hidden flex-center',
        },
    ]

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {showSearchBar && windowWidth >= 640 && (
                    <>
                        <motion.input
                            autoComplete="off"
                            variants={searchbarVariants}
                            initial="initial"
                            exit="exit"
                            type="search"
                            animate="animate"
                            className={`border-2 border-gray-300 bg-white h-10 px-5  rounded-lg text-sm focus:outline-none my-auto mr-5`}
                            name="search"
                            placeholder="What are you looking for?"
                            onChange={seachFilterAction}
                        />
                    </>
                )}
            </AnimatePresence>
            <div className="flex space-x-3 relative justify items-center">
                {_icons.map(({ title, url, uniqueClasses }, index) => (
                    <div
                        key={index}
                        className={clsx(
                            title === 'cart' && 'relative',
                            `transition-all duration-100 my-auto  flex items-center justify-center`,
                            uniqueClasses && uniqueClasses,
                        )}
                        onClick={() => {
                            title === 'menu' && dispatch(SHOW_SIDE_MENU())
                            title === 'cart' && dispatch(SHOW_CART_SIDE_MENU())
                            windowWidth < 640 && title === 'search' && dispatch(SHOW_SEARCH_PAGE())
                            windowWidth >= 640 &&
                                title === 'search' &&
                                setShowSearchBar((prev) => !prev)
                        }}
                    >
                        {title === 'cart' && inCartProducts.length > 0 && (
                            <span className="animate-bounce absolute inline-flex top-0 right-0 h-2 w-2 z-10 rounded-full bg-red-600"></span>
                        )}
                        <Image
                            className="nav-icon nav-icon-styles my-auto"
                            src={url}
                            layout="intrinsic"
                            height={windowWidth >= 1024 ? '30' : '25'}
                            width={windowWidth >= 1024 ? '30' : '25'}
                            alt={title}
                        />
                    </div>
                ))}

                <Menu as="div" className="mx-3 relative hidden lg:block">
                    <div>
                        <Menu.Button className="bg-yellow flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-300">
                            <span className="sr-only">Open user menu</span>

                            {!user && !isLoading && (
                                <img
                                    className=" h-[30px] w-[30px] p-1 rounded-full "
                                    src="/static/svg/Person.svg"
                                    alt=""
                                />
                            )}

                            {user && !isLoading && (
                                <img
                                    className=" h-[30px] w-[30px] rounded-full"
                                    src={user.picture as string}
                                    alt=""
                                />
                            )}
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {!user && !isLoading && (
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link href="/api/auth/login">
                                            <a
                                                className={clsx(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700',
                                                )}
                                            >
                                                Login / Register
                                            </a>
                                        </Link>
                                    )}
                                </Menu.Item>
                            )}

                            {user && !isLoading && (
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link href="/api/auth/logout">
                                            <a
                                                className={clsx(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700',
                                                )}
                                            >
                                                Sign out
                                            </a>
                                        </Link>
                                    )}
                                </Menu.Item>
                            )}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    )
}
