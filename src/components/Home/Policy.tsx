import React from 'react'
import { PolicyProps } from '../../../libs/types/landingTypes'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from '../../../utils/sanity'
import clsx from 'clsx'
import Container from '../../ui/container'
import SwiperCore, { Autoplay, EffectFade } from 'swiper'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useWindowSize } from '../../../libs/hooks'

SwiperCore.use([Autoplay, EffectFade])

export const Policy: React.FC<PolicyProps> = ({ title }) => {
    const windowWidth = useWindowSize()?.width ?? 0

    return (
        <section className="bg-brown">
            <Container className=" mx-auto ">
                <Swiper
                    className="!py-8 "
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
                    }}
                    loopedSlides={title.length}
                    loop={windowWidth >= 640 ? false : true}
                    centerInsufficientSlides={true}
                    autoplay
                >
                    {title.map((data, index) => (
                        <SwiperSlide
                            key={index}
                            className={clsx(
                                'text-primary',
                                index === 1 && ' lg:border-r lg:border-l',
                            )}
                        >
                            <SanityImg
                                className="mx-auto h-[30px] lg:h-[50px]"
                                builder={imageUrlBuilder}
                                image={data.icon}
                                height={50}
                            />
                            <h6 className="font-bold font-[36px] text-center mt-1">{data.title}</h6>
                            <p className="text-center">{data.description}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    )
}
