import React, { useRef } from "react";
import { LatestProductsProps } from "../../../libs/types/landingTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useIntersection } from "../../../libs/hooks";
import { Card } from "../common/Card";
import { motion } from "framer-motion";

SwiperCore.use([Autoplay, EffectFade, Navigation]);

export const LatestProducts: React.FC<LatestProductsProps> = ({
  latestProduct,
}) => {
  // custome navigation button ref
  const navigationPrevRef = useRef<HTMLSpanElement>(null);
  const navigationNextRef = useRef<HTMLSpanElement>(null);

  return (
    <section className="bg-antiFlashWhite py-section w-full">
      <div className="section">
        <h2 className="section-title text-center  hover:text-yellow transition-colors duration-150 cursor-pointer">
          LATEST PRODUCTS
        </h2>

        <div className=" flex-col-reverse flex ">
          <div className="flex m-auto space-x-3 ">
            <span className="cardNavBtn" ref={navigationPrevRef}>
              <AiOutlineArrowLeft />
            </span>
            <span className="cardNavBtn" ref={navigationNextRef}>
              <AiOutlineArrowRight />
            </span>
          </div>
          <div className="overflow-hidden lg:px-5">
            <Swiper
              className="my-16 !overflow-visible"
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
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              centerInsufficientSlides={true}
              autoplay={{ disableOnInteraction: false }}
              navigation={{
                prevEl: navigationPrevRef.current
                  ? navigationPrevRef.current
                  : undefined,
                nextEl: navigationNextRef.current
                  ? navigationNextRef.current
                  : undefined,
              }}
              onInit={(swiper: any) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
                swiper.navigation.update();
              }}
            >
              {latestProduct.map((product, index) => (
                <SwiperSlide key={index}>
                  {() => {
                    const watchonViewRef = useRef(null);
                    const sectionOnview = useIntersection(watchonViewRef);

                    return (
                      <motion.div
                        ref={watchonViewRef}
                        key={index}
                        initial="collapsed"
                        animate={
                          sectionOnview?.isIntersecting ? "open" : "collapsed"
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
                    );
                  }}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
