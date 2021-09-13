import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { ReviewsProps } from '../../../libs/types/landingTypes'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
import { imageUrlBuilder, PortableText } from '../../../utils/sanity'
import { useWindowSize } from '../../../libs/hooks'
import Container from '../../ui/container'

SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination])

export const Reviews: React.FC<ReviewsProps> = ({ reviews, headline }) => {
    const windowWidth = useWindowSize()?.width ?? 0

    return (
        <section className="bg-antiFlashWhite w-full">
            <Container>
                <div className="section-title flex justify-center items-center ">
                    <PortableText blocks={headline} />
                </div>
                <Swiper
                    className="my-10 cursor-move review"
                    slidesPerView={1}
                    spaceBetween={20}
                    centerInsufficientSlides={true}
                    autoplay={{ disableOnInteraction: false }}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {reviews?.map(({ description, image, name }, i) => (
                        <SwiperSlide
                            key={i}
                            className="grid grid-cols-12 p-4 bg-white justify-center items-center rounded-3xl lg:gap-5 "
                        >
                            <div className=" lg:col-span-3 col-span-12 lg:border-r">
                                <SanityImg
                                    builder={imageUrlBuilder}
                                    image={image}
                                    width={windowWidth >= 1080 ? 110 : 50}
                                    height={windowWidth >= 1080 ? 110 : 50}
                                    className="relative z-10 rounded-full mx-auto"
                                    alt={`client ${name}`}
                                />
                                <p className="text-center">{name}</p>
                            </div>
                            <p className="lg:col-span-9 col-span-12 italic lg:text-2xl text-base font-light text-center lg:text-left">
                                {description}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    )
}
