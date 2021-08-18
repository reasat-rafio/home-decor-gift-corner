import { SetStateAction } from "react";
import { Dispatch } from "react";
export interface ProductsProps {
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
}

export interface TopMenuProps {
  selectedSort: string;
  grid: number;
  setSelectedSort: Dispatch<SetStateAction<string>>;
  setGrid: Dispatch<SetStateAction<number>>;
  sorts: string[];
}

export interface SmFilterDropDownProps {
  sorts: string[];
  setSelectedSort: Dispatch<SetStateAction<string>>;
  selectedSort: string;
}
