import React, { Dispatch, SetStateAction } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { BiGridVertical } from "react-icons/bi";
import { TopMenuProps } from "../../../../libs/types/shopTypes";
import clsx from "clsx";

export const TopMenu: React.FC<TopMenuProps> = ({
  grid,
  selectedSort,
  setGrid,
  setSelectedSort,
  sorts,
}) => {
  return (
    <div className="bg-white rounded-xl">
      <div className="flex py-2 px-3 items-center">
        <div className="flex flex-1 items-center">
          <p className="mr-2">Short By:</p>
          <ul className="flex items-center">
            {sorts.map((sort, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setSelectedSort(sort);
                  }}
                  className={clsx(
                    "cardBtn mx-1",
                    selectedSort === sort && "bg-yellow"
                  )}
                >
                  {sort}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center ">
          <CgMenuGridR
            className="cursor-pointer"
            size="30"
            onClick={() => setGrid(4)}
            color={grid === 4 ? "black" : "gray"}
          />
          <BiGridVertical
            className="cursor-pointer"
            size="30"
            onClick={() => setGrid(2)}
            color={grid === 2 ? "black" : "gray"}
          />
        </div>
      </div>
    </div>
  );
};
