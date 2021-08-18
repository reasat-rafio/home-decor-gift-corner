import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { HIDE_SEARCH_PAGE, selectDom } from "../../../store/dom";
import { searchPageVarients } from "../../../../libs/animation";

interface SmSearchPageProps {}

export const SmSearchPage: React.FC<SmSearchPageProps> = ({}) => {
  const { showSmSearchPage } = useAppSelector(selectDom);
  const dispatch = useAppDispatch();

  const [searchInput, setSearchInput] = useState<string>("");
  const [searchFilterItems, setSearchFilterItems] = useState([]);

  const searchInputOnChangeAction = (e) => {
    // setSearchInput(e.target.value);
    // const all_products = productsState.products.map(
    //    ({ name, image, offer_price, regular_price, slug }) => {
    //       return { name, image, offer_price, regular_price, slug };
    //    }
    // );
    // // const { filteredItme } = useSearchFilter(all_products, e.target.value);
    // setSearchFilterItems(filteredItme);
  };

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {showSmSearchPage && (
          <motion.section
            initial="initial"
            animate="animate"
            exit="exit"
            variants={searchPageVarients}
            className={
              "fixed min-h-screen  w-screen bg-white z-50 block overflow-auto"
            }
          >
            <div className="container mx-auto">
              <div className="flex justify-end">
                <span
                  className="p-3 cursor-pointer"
                  onClick={() => dispatch(HIDE_SEARCH_PAGE())}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 hover:scale-110 transition-all duration-150 hover:text-yellow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>

              <form className=" flex justify-center flex-col ">
                <input
                  type="text"
                  className="border rounded-sm py-3 px-2 outline-none mx-auto  w-11/12  "
                  onChange={(e) => searchInputOnChangeAction(e)}
                />
                {searchInput.length <= 0 && (
                  <p className="text-sm text-gray-500 font-text  mx-auto">
                    Type here any product name
                  </p>
                )}

                {searchInput.length > 0 && (
                  <div className=" my-2  flex justify-end font-title  overflow-auto">
                    <ul className="w-full rounded-sm overflow-auto p-3 divide-y-2 shadow-md disable-scrollbars ">
                      {searchFilterItems && searchFilterItems.length > 0 ? (
                        searchFilterItems.map(
                          ({
                            name,
                            image,
                            offer_price,
                            regular_price,
                            slug,
                            short_description,
                          }) => (
                            <Link href={`/items/${slug}`}>
                              <li
                                onClick={() => dispatch(HIDE_SEARCH_PAGE())}
                                className={
                                  "py-2 grid grid-cols-12 hover:bg-gray-50 cursor-pointer gap-3 text-sm"
                                }
                              >
                                <div className="col-span-1 my-auto">
                                  <Image
                                    className=""
                                    src={image[0].url}
                                    layout="responsive"
                                    height="1"
                                    width="1"
                                    alt={name}
                                  />
                                </div>

                                <div className="col-span-11 flex flex-col justify-center">
                                  <p className="truncate font-medium">{name}</p>
                                  {short_description && (
                                    <p className="truncate max-w-md">
                                      {short_description}
                                    </p>
                                  )}
                                  {offer_price ? (
                                    <div>
                                      <span className="line-through text-gray-500">
                                        ৳{regular_price}
                                      </span>
                                      <span className="text-lightBlue text-xl font-semibold">
                                        ৳{offer_price}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-lightBlue text-xl font-semibold">
                                      ৳{regular_price}
                                    </span>
                                  )}
                                </div>
                              </li>
                            </Link>
                          )
                        )
                      ) : (
                        <p className="flex ">
                          Sorry, nothing found for
                          <span className="font-semibold ml-2">
                            {searchInput}
                          </span>
                        </p>
                      )}
                    </ul>
                  </div>
                )}
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};
