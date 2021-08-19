import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useOutsideAlerter } from '../../../../libs/hooks'
import { HIDE_CART_SIDE_MENU, HIDE_SHOP_CATEGORY_SIDE_MENU, selectDom } from '../../../store/dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { sideBarVarients } from '../../../../libs/animation'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'

export const CategorySideMenu: React.FC<{ category: category[] }> = ({ category }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { showShopCategorySideMenu } = useAppSelector(selectDom)

    const [queryName, setQueryName] = useState<string | string[] | undefined>('')

    const closeSideMenubarAction = () => {
        dispatch(HIDE_SHOP_CATEGORY_SIDE_MENU())
    }

    // Cart Sidebar ref
    const cartSidebarRef = useRef<HTMLDivElement>(null)
    useOutsideAlerter(cartSidebarRef, { dispatch: HIDE_CART_SIDE_MENU })
    useEffect(() => {
        if (Object.keys(router.query).length !== 0) {
            const queryParams = router.query.category
            setQueryName(queryParams)
        }
    }, [queryName, router.query.category])

    return (
        <>
            <div
                className={`fixed h-full w-full right-0 top-0 left-0 bottom-0  transition-all duration-300 ${
                    showShopCategorySideMenu ? ' z-40 block' : 'z-0 hidden'
                }`}
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            />
            <AnimatePresence exitBeforeEnter>
                {showShopCategorySideMenu && (
                    <motion.div
                        ref={cartSidebarRef}
                        variants={sideBarVarients}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={`fixed h-full md:w-96 w-full right-0 top-0 bg-white z-50  flex flex-col p-5`}
                    >
                        <motion.span onClick={closeSideMenubarAction} className="cursor-pointer">
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
                        </motion.span>

                        <ul className="p-3 bg-white rounded-xl flex flex-col justify-center items-center space-y-3 h-[80vh]">
                            {category?.map((cat: category, index: number) => (
                                <li
                                    onClick={() => dispatch(HIDE_SHOP_CATEGORY_SIDE_MENU())}
                                    key={index}
                                    className={clsx(
                                        'lg:text-5xl text-4xl hover:text-yellow transition-colors duration-150 text-center border-b',
                                        cat.slug.current == queryName
                                            ? 'text-yellow'
                                            : 'text-black',
                                    )}
                                >
                                    <Link href={`/category/${cat.slug.current}`}>
                                        <a className="">{cat.title}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
