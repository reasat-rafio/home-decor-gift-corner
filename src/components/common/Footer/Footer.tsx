import React from "react";
import { FooterProps } from "../../../../libs/types/commonTypes";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder, PortableText } from "../../../../utils/sanity";
import Link from "next/link";

export const Footer: React.FC<FooterProps> = ({
  description,
  nav,
  socials,
  logo,
  copyright,
}) => {
  return (
    <footer className="relative  bg-brown text-white">
      <div className="section">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <Link href="/">
              <a
                aria-label="Go home"
                title="Home Decor and Gift Center"
                className="inline-flex items-center"
              >
                <SanityImg builder={imageUrlBuilder} image={logo} width={150} />
              </a>
            </Link>

            <div className="mt-4 lg:max-w-sm text-sm">
              <PortableText blocks={description} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-3">
            {nav?.map(({ title, nav }, i) => (
              <div key={i}>
                <p className="font-semibold tracking-wide text-yellow-400">
                  {title}
                </p>
                <ul className="mt-2 space-y-2">
                  {nav?.map((n, i) => (
                    <li key={i}>
                      {n.href ? (
                        <Link href={`${n.href}`}>
                          <a className="transition-colors duration-300 hover:text-yellow-300">
                            {n.title}
                          </a>
                        </Link>
                      ) : (
                        <p className="transition-colors duration-300  hover:text-yellow-300">
                          {n.title}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
          <p className="text-sm text-gray-100">{copyright}</p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            {socials.map(({ logo, url }, i) => (
              <React.Fragment key={i}>
                <Link href={url}>
                  <a title={url}>
                    <SanityImg
                      builder={imageUrlBuilder}
                      image={logo}
                      width={30}
                    />
                  </a>
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
