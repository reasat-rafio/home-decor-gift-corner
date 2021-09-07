import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { DealsAndOffersProps } from '../../../libs/types/landingTypes'
import { Card } from '../common/Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectFade } from 'swiper'
import 'swiper/swiper-bundle.css'
import { motion } from 'framer-motion'
import { useIntersection } from '../../../libs/hooks'
import { ProductsProps } from '../../../libs/types/shopTypes'
import Container from '../../ui/container'

SwiperCore.use([Autoplay, EffectFade])

export const DealsAndOffers: React.FC<DealsAndOffersProps> = ({
    bestSeller,
    deals,
    offer,
    special,
}) => {
    const [activeDeal, setActiveDeal] = useState<string>(deals[1].title)
    const [_products, setProducts] = useState<ProductsProps[] | null>(null)

    const allProducts: any[] = [...bestSeller, ...offer, ...special]

    useEffect(() => {
        const activeProducts = allProducts.filter(
            (product) => product.deals[0].title === activeDeal,
        )
        setProducts(activeProducts)
    }, [activeDeal])

    return (
        <section className="bg-antiFlashWhite w-full py-section">
            <Container>
                <h2 className="section-title text-center  hover:text-yellow transition-colors duration-150 cursor-pointer">
                    PRODUCTS
                </h2>

                <ul className="flex-center gap-10 my-10">
                    {deals.map(({ title }, index) => (
                        <li
                            key={index}
                            onClick={() => setActiveDeal(title)}
                            className={clsx(
                                'rounded-full lg:py-2 lg:px-5 py-1 px-3 cursor-pointer   hover:bg-yellow hover:text-black transition-colors duration-200 lg:text-xl  text-base',
                                title === activeDeal ? 'bg-yellow ' : '',
                            )}
                        >
                            {title}
                        </li>
                    ))}
                </ul>

                <div className="overflow-hidden lg:px-5">
                    <Swiper
                        className="lg:my-16 my-5 !overflow-visible"
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },

                            640: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },

                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                            1536: {
                                slidesPerView: 4.3,
                                spaceBetween: 50,
                            },
                        }}
                        centerInsufficientSlides={true}
                        autoplay={{ disableOnInteraction: false }}
                    >
                        {_products?.map((product, index) => (
                            <SwiperSlide key={index}>
                                {() => {
                                    const watchonViewRef = useRef(null)
                                    const sectionOnview = useIntersection(watchonViewRef)

                                    return (
                                        <motion.div
                                            ref={watchonViewRef}
                                            key={index}
                                            initial="collapsed"
                                            animate={
                                                sectionOnview?.isIntersecting ? 'open' : 'collapsed'
                                            }
                                            variants={{
                                                open: {
                                                    opacity: 1,
                                                    scale: 1,
                                                    y: 0,
                                                },
                                                collapsed: { opacity: 0, scale: 0.8, y: 300 },
                                            }}
                                        >
                                            <Card product={product} />
                                        </motion.div>
                                    )
                                }}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </section>
    )
}
