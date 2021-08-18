import React from "react";
import { PolicyProps } from "../../../libs/types/landingTypes";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "../../../utils/sanity";
import clsx from "clsx";

export const Policy: React.FC<PolicyProps> = ({ title }) => {
  return (
    <section className="bg-brown">
      <div className="container mx-auto">
        <div className="grid grid-cols-12  py-8 gap-7 md:gap-1 ">
          {title.map((data, i) => (
            <div
              key={i}
              className={clsx(
                "col-span-12 md:col-span-4 text-primary my-auto ",
                i == 0 && " md:border-r mr-2 border-yellow-400",
                i == 1 && " md:border-l border-r md:py-2  border-yellow-400 ,",
                i == 2 && " md:border-l ml-2  border-yellow-400 ,bg-red-400"
              )}
            >
              <SanityImg
                className="mx-auto"
                builder={imageUrlBuilder}
                image={data.icon}
                height={50}
              />
              <h6 className="font-bold font-[36px] text-center mt-1">
                {data.title}
              </h6>
              <p className="text-center">{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
