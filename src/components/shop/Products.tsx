import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { ProductsProps } from "../../../libs/types/shopTypes";
import { Card } from "../common/Card";

const Content: React.FC<{
  product: ProductsProps;
  index: number;
  grid: number;
}> = ({ product, index, grid }) => {
  console.log(grid);

  return (
    <div
      key={index}
      className={clsx(
        `col-span-12 md:col-span-6  xl:col-span-4`,
        grid === 4 ? " 2xl:col-span-3" : " 2xl:col-span-6"
      )}
    >
      <Card product={product} />
    </div>
  );
};

export const Products: React.FC<{
  products: ProductsProps[];
  selectedSort: string;
  grid: number;
}> = ({ products, selectedSort, grid }) => {
  const [_products, setProducts] = useState(products);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  return (
    // Must find a way to fix it! Not looking good!

    <div className="grid grid-cols-12 gap-5 mt-10  ">
      {selectedSort === "Name (A - Z)" &&
        _products
          .sort((a, b) => (a.title > b.title ? 1 : -1))
          .map((product, index) => (
            <Content product={product} index={index} grid={grid} />
          ))}
      {selectedSort === "Name (Z - A)" &&
        _products
          .sort((a, b) => (a.title < b.title ? 1 : -1))
          .map((product, index) => (
            <Content product={product} index={index} grid={grid} />
          ))}
      {selectedSort === "Price (Low - High)" &&
        _products
          .sort((a, b) => a.price - b.price)
          .map((product, index) => (
            <Content product={product} index={index} grid={grid} />
          ))}

      {selectedSort === "Price (High - Low)" &&
        _products
          .sort((a, b) => b.price - a.price)
          .map((product, index) => (
            <Content product={product} index={index} grid={grid} />
          ))}
    </div>
  );
};
