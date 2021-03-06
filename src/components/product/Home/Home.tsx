import React, { useEffect, useRef } from 'react'
import { HomeProps } from '../../../../libs/types/productTypes'
import { imageUrlBuilder, PortableText } from '../../../../utils/sanity'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectFade, Navigation } from 'swiper'
import { SanityImg } from 'sanity-react-extra'
import { Gallery, Item, useGallery, CustomGallery } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import 'swiper/swiper-bundle.css'
import { useState } from 'react'
import { Action } from './Action'
import { useWindowSize } from '../../../../libs/hooks'
import clsx from 'clsx'
import { Cross } from '../../../../libs/svgs'

SwiperCore.use([Autoplay, EffectFade, Navigation])

export const Home: React.FC<HomeProps> = (product) => {
    const [quantity, setQuantity] = useState(1)
    const windowWidth = useWindowSize()?.width ?? 0

    const imgContaineRef = useRef<HTMLDivElement>(null)

    const [fullscreenView, setFullscreenView] = useState(false)
    const [fn, setFn] = useState<any>()

    const { height: windowHeight } = useWindowSize() ?? {
        width: 0,
        height: 0,
    }

    return (
        <section className="bg-antiFlashWhite py-section w-full ">
            <div
                className="section grid grid-cols-12 gap-0 lg:justify-start items-start  "
                ref={imgContaineRef}
            >
                <div className={clsx('col-span-12 lg:col-span-4 lg:sticky top-10 z-20')}>
                    <Gallery
                        options={{
                            closeOnScroll: false,
                            closeOnVerticalDrag: false,
                            pinchToClose: false,
                            escKey: false,
                            closeElClasses: [],
                            closeEl: false,
                            tapToToggleControls: false,
                            clickToCloseNonZoomable: false,
                            // barsSize: { top: 150, bottom: 'auto' },
                        }}
                        onOpen={(api) => {
                            setFn(api)
                        }}
                    >
                        <Swiper
                            className="my-16 grid items-center"
                            centerInsufficientSlides={true}
                            navigation
                            slidesPerView={1}
                            spaceBetween={10}
                        >
                            {product?.images?.map((image, index) => (
                                <SwiperSlide key={index} className="h-full w-full">
                                    <Item
                                        original={
                                            imageUrlBuilder
                                                .image(image)
                                                .width(1024)
                                                .auto('format')
                                                .url() as string
                                        }
                                        thumbnail={
                                            imageUrlBuilder
                                                .image(image)
                                                .width(300)
                                                .height(200)
                                                .auto('format')
                                                .url() as string
                                        }
                                        width="1024"
                                        height="780"
                                    >
                                        {({ ref, open }) => {
                                            return (
                                                <SanityImg
                                                    ref={
                                                        ref as React.MutableRefObject<HTMLImageElement>
                                                    }
                                                    onClick={() => {
                                                        setFullscreenView(true)
                                                        open()
                                                    }}
                                                    builder={imageUrlBuilder}
                                                    image={image}
                                                    height={windowWidth >= 1024 ? 600 : 400}
                                                    alt={product.title}
                                                    className="rounded-2xl transition-transform duration-150 object-cover h-full drop-shadow-xl cursor-pointer mx-auto"
                                                />
                                            )
                                        }}
                                    </Item>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Gallery>
                </div>
                <div className="col-span-12 lg:col-span-8 md:ml-16 ml-0 prose-sm lg:prose section_padding  !max-w-none z-0">
                    <h1>{product.title}</h1>
                    {product?.brand && (
                        <div>
                            <h3>Brand</h3>
                            <div className="flex items-center ">
                                <SanityImg
                                    builder={imageUrlBuilder}
                                    image={product?.brand?.logo}
                                    width={40}
                                    alt={product?.brand?.name}
                                    className="rounded !m-0 !p-0"
                                />
                                <p className="!m-0 !p-0 !ml-2">{product.brand?.name}</p>
                            </div>
                        </div>
                    )}

                    <span className="text-yellow">{product.availbility}</span>
                    <h3>Product Description</h3>
                    <PortableText
                        className="prose-yellow prose-sm lg:prose lg:prose-yellow !max-w-none border-b  "
                        blocks={product.body}
                    />

                    {product.offer_price ? (
                        <p>
                            <span className="!text-base !line-through !mx-2 text-gray-600">
                                {product.price.toLocaleString()} ???
                            </span>
                            <span className="xl:text-4xl text-3xl  text-yellow">
                                {product.offer_price.toLocaleString()} ???
                            </span>
                        </p>
                    ) : (
                        <span className="xl:text-4xl text-3xl  text-yellow ">
                            {product.price.toLocaleString()} ???
                        </span>
                    )}
                    <Action quantity={quantity} setQuantity={setQuantity} product={product} />
                </div>
            </div>

            {fullscreenView && (
                <div
                    className="fixed top-[15%] right-12 scale-150 z-40 cursor-pointer  text-yellow"
                    onClick={() => {
                        setFullscreenView(false)
                        fn.close()
                    }}
                >
                    <Cross />
                </div>
            )}
        </section>
    )
}
