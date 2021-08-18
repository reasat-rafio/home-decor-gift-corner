import React from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { showMoreSortVariants } from "../../../../libs/animation";
import { useState } from "react";
import { SmFilterDropDownProps } from "../../../../libs/types/shopTypes";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectDom, SHOW_SHOP_CATEGORY_SIDE_MENU } from "../../../store/dom";

export const SmFilterDropDown: React.FC<SmFilterDropDownProps> = ({
  sorts,
  selectedSort,
  setSelectedSort,
}) => {
  const dispatch = useAppDispatch();
  const { showCartSideMenu } = useAppSelector(selectDom);

  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className="flex justify-center items-center ">
      <button
        className="flex items-center"
        onClick={() => dispatch(SHOW_SHOP_CATEGORY_SIDE_MENU())}
      >
        <BiMenuAltLeft size="25" color="black" />
        <p className="font-bold text-sm text-gray-900">OPTION</p>
      </button>

      <div className="relative text-xs flex-1 mx-3">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 text-left focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400  text-xs"
          onClick={() => setShowDropDown((prev: boolean) => !prev)}
        >
          <span className="flex items-center">
            <span className="pl-3 block truncate">{selectedSort}</span>
          </span>
          <span className="pl-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        <AnimatePresence exitBeforeEnter>
          {showDropDown && (
            <motion.div
              variants={showMoreSortVariants}
              initial="inital"
              animate="animate"
              exit="exit"
              className="absolute mt-1 w-full rounded-md bg-white  shadow-lg z-40 "
            >
              <ul
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-item-3"
                className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm"
              >
                {sorts.map((s, i) => (
                  <li
                    key={i}
                    id="listbox-item-0"
                    role="option"
                    className="text-gray-500 text-xs lg:base  select-none relative py-2 pl-3 pr-9 cursor-pointer"
                    onClick={() => {
                      setSelectedSort(s);
                      setShowDropDown(false);
                    }}
                  >
                    <div className="flex items-center">
                      <span className="ml-3 block font-normal truncate">
                        {s}
                      </span>
                    </div>
                    {selectedSort === s && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
