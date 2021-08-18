import React, { useRef } from "react";
import { useIntersection, useWindowSize } from "../../../../libs/hooks";
import { ProductsProps } from "../../../../libs/types/shopTypes";
import "swiper/swiper-bundle.css";
import SwiperCore, { Autoplay, EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { RelatedProductsProps } from "../../../../libs/types/productTypes";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Card } from "../../common/Card";
import { motion } from "framer-motion";

SwiperCore.use([Autoplay, EffectFade, Navigation]);

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
}) => {
  const navigationPrevRef = useRef<HTMLSpanElement>(null);
  const navigationNextRef = useRef<HTMLSpanElement>(null);

  return (
    <section className="bg-antiFlashWhite py-section w-full ">
      <div className="section">
        <div className="flex">
          <h2 className="section-title text-center md:my-5 my-0">
            Realted Products
          </h2>
          <div className="mr-5 lg:mr-14 flex m-auto space-x-5">
            <span className="cardNavBtn" ref={navigationPrevRef}>
              <AiOutlineArrowLeft />
            </span>
            <span className="cardNavBtn" ref={navigationNextRef}>
              <AiOutlineArrowRight />
            </span>
          </div>
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
            autoplay={{ disableOnInteraction: true }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onInit={(swiper: any) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.update();
            }}
          >
            {products?.map((product, index) => (
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
    </section>
  );
};
