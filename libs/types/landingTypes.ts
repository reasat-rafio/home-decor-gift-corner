import { ProductsProps } from "./shopTypes";

export interface HomeProps {
  type: string;
  backgroundImage: Image;
  button: Button;
  description: string;
  title: Title[];
}

export interface PolicyProps {
  type: string;
  title: PolicyTitle[];
}

export interface ReviewsProps {
  type: string;
  headline: Headline[];
  reviews: Review[];
}

export interface LatestProductsProps {
  latestProduct: ProductsProps[];
}

export interface DealsAndOffersProps {
  special: ProductsProps[];
  offer: ProductsProps[];
  bestSeller: ProductsProps[];
  deals: Deal[];
}

export interface NewsletterProps {
  headline: string;
  description: string;
  icon: Image;
}
