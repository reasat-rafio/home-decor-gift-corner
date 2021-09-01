import React from 'react'
import { HomeProps } from '../../../libs/types/landingTypes'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, PortableText } from '../../../utils/sanity'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectProduct } from '../../store/product'

export const Home: React.FC<HomeProps> = ({ title, description, backgroundImage, button }) => {
    return (
        <section>
            <SanityImg
                className="h-screen relative top-0 right-0 w-full object-cover"
                builder={imageUrlBuilder}
                image={backgroundImage}
                height={1000}
            />
            <div className="h-screen absolute px-8 top-0 flex flex-col justify-center items-center lg:items-start w-full ">
                <div className=" flex flex-col justify-center items-center lg:items-start">
                    <div className="title ">
                        <PortableText blocks={title} />
                    </div>
                    <h5 className="text-[#777777] italic lg:font-[36px] font-[25px]">
                        {description}
                    </h5>
                    {/* <button className="bg-yellow px-7 py-1 rounded-full my-5 mx-auto font-semibold lg:font-[36px] font-[25px]">
            <Link href={button.href}>
              <a> {button.title} </a>
            </Link>
          </button> */}
                </div>
            </div>
        </section>
    )
}
