import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useOutsideAlerter } from '../../../../libs/hooks'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { HIDE_SIDE_MENU, selectDom } from '../../../store/dom'
import { sideBarVarients } from '../../../../libs/animation'
import { PortableText } from '../../../../utils/sanity'
import { Cross, Gmail, Login, Logout, Phone } from '../../../../libs/svgs'
import { useUser } from '@auth0/nextjs-auth0'

export const NavSideBars: React.FC<{
    sideMenuInfo: SideMenuInfo
    menu: NavMenu[]
}> = ({ sideMenuInfo: { assistance, delivery }, menu }) => {
    const dispatch = useAppDispatch()
    const { showSideMenu, isLoggedIn } = useAppSelector(selectDom)
    const sidebarRef = useRef<HTMLDivElement | null>(null)
    useOutsideAlerter(sidebarRef, { dispatch: HIDE_SIDE_MENU })
    const { user, isLoading } = useUser()

    const closeSideMenubarAction = () => {
        dispatch(HIDE_SIDE_MENU())
    }

    return (
        <>
            <div
                className={`fixed h-full w-full right-0 top-0 left-0 bottom-0  transition-all duration-300${
                    showSideMenu ? ' z-40  block ' : ' z-0 hidden '
                }`}
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            />

            <AnimatePresence exitBeforeEnter>
                {showSideMenu && (
                    <motion.section
                        ref={sidebarRef}
                        variants={sideBarVarients}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={`fixed h-full md:w-96 w-full  right-0 top-0  bg-brown  p-8 z-50 overflow-auto `}
                    >
                        <motion.span onClick={closeSideMenubarAction} className="cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 hover:scale-110 transition-all duration-150 text-yellow"
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
                        </motion.span>
                        <ul className="py-8 border-b transition-all duration-300 ">
                            {menu.map(({ href, title, _key }) => (
                                <li
                                    key={_key}
                                    onClick={closeSideMenubarAction}
                                    className="lg:text-5xl text-4xl my-3 hover:text-yellow transition-colors duration-150"
                                >
                                    <Link href={href}>
                                        <a className="text-white">{title}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* info */}
                        <div className="my-6 border-b">
                            {/* Assistance */}
                            <div className="">
                                <p className="font-semibold text-2xl font-sans text-yellow">
                                    {assistance.title}
                                </p>
                                <div className="flex items-center space-x-2 text-white  text-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <PortableText className="" blocks={assistance.email} />
                                </div>
                                <div className="flex items-center space-x-2 text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <p className="">{assistance.number}</p>
                                </div>
                            </div>
                            {/* Delivery */}
                            <div className="flex my-4">
                                <div className="text-lg text-white">
                                    <p className="font-semibold text-2xl font-sans text-yellow !m-0 ">
                                        {delivery.title}
                                    </p>
                                    <PortableText blocks={delivery.info} />
                                </div>
                            </div>
                        </div>

                        {/* Auth */}
                        <div className="cursor-pointer text-2xl ">
                            {!isLoading && user && (
                                <Link href="/api/auth/logout">
                                    <a className="flex items-center space-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        <button className="text-white">Logout</button>
                                    </a>
                                </Link>
                            )}

                            {!isLoading && !user && (
                                <Link href="/api/auth/login">
                                    <a
                                        className="flex items-center space-x-2"
                                        onClick={closeSideMenubarAction}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        <button className="text-white">Login / Register</button>
                                    </a>
                                </Link>
                            )}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    )
}
