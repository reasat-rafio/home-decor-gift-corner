import React from 'react'
import { HomeProps } from '../../../libs/types/landingTypes'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, PortableText } from '../../../utils/sanity'

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
                <div className=" flex flex-col justify-center items-center lg:items-start ">
                    <div className="title  text-center lg:text-left">
                        <PortableText blocks={title} />
                    </div>
                    <h5 className="text-[#777777] italic lg:font-[36px] font-[25px] text-center lg:text-left">
                        {description}
                    </h5>
                </div>
            </div>
        </section>
    )
}
