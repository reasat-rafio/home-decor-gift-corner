import { ProductsProps } from "./shopTypes";
import { SetStateAction, Dispatch } from "react";

export interface HomeProps {
  availbility?: string;
  categories: Category[];
  mainImage: Image;
  price: number;
  slug: Slug;
  title: string;
  offer_price?: number;
  deals?: Deal[];
  body?: Body[];
  images?: Image[];
  tags?: Category[];
  brand?: {
    name: string;
    logo: Image;
  };
  related_product?: ProductsProps[];
}

export interface ActionProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  product: HomeProps;
}

export interface RelatedProductsProps {
  products: ProductsProps[];
}
