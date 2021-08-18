import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { searchbarVariants } from "../../../../libs/animation";
import { useWindowSize } from "../../../../libs/hooks";
import {
  SHOW_CART_SIDE_MENU,
  SHOW_SEARCH_PAGE,
  SHOW_SIDE_MENU,
} from "../../../store/dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectProduct } from "../../../store/product";

interface IIcons {
  title: string;
  url: string;
  uniqueClasses?: string;
}

export const Icon: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const windowWidth = useWindowSize()?.width ?? 0;
  const { inCartProducts } = useAppSelector(selectProduct);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const _icons: IIcons[] = [
    {
      title: "search",
      url: "/static/svg/Search.svg",
      uniqueClasses: " flex-center",
    },
    {
      title: "cart",
      url: "/static/svg/Cart.svg",
      uniqueClasses: " flex-center",
    },
    {
      title: "person",
      url: "/static/svg/Person.svg",
      uniqueClasses: "hidden lg:flex",
    },
    {
      title: "menu",
      url: "/static/svg/Menu.svg",
      uniqueClasses: "lg:hidden flex-center",
    },
  ];

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {showSearchBar && windowWidth >= 640 && (
          <motion.input
            variants={searchbarVariants}
            initial="initial"
            exit="exit"
            animate="animate"
            className={`border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none my-auto mr-5`}
            type="search"
            name="search"
            placeholder="What are you looking for?"
            // onChange={(e) => searchInputOnChangeAction(e)}
          />
        )}
      </AnimatePresence>
      <div className="flex justify-center items-center space-x-3 relative">
        {_icons.map(({ title, url, uniqueClasses }, index) => (
          <div
            key={index}
            className={clsx(
              `hover:scale-105 transition-all duration-100 my-auto `,
              uniqueClasses && uniqueClasses
            )}
            onClick={() => {
              title === "menu" && dispatch(SHOW_SIDE_MENU());
              title === "cart" && dispatch(SHOW_CART_SIDE_MENU());
              windowWidth < 640 &&
                title === "search" &&
                dispatch(SHOW_SEARCH_PAGE());
              windowWidth >= 640 &&
                title === "search" &&
                setShowSearchBar((prev) => !prev);
            }}
          >
            <div className={clsx(title === "cart" && "relative")}>
              {title === "cart" && inCartProducts.length > 0 && (
                <span className="animate-bounce absolute inline-flex top-0 right-0 h-2 w-2 z-10 rounded-full bg-red-600"></span>
              )}
              <Image
                className="nav-icon nav-icon-styles "
                src={url}
                layout="intrinsic"
                height={windowWidth >= 1024 ? "30" : "25"}
                width={windowWidth >= 1024 ? "30" : "25"}
                alt={title}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
