interface Image {
  _type: string;
  asset: Asset;
}
interface Asset {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  assetId: string;
  extension: string;
  metadata: Metadata;
  mimeType: string;
  originalFilename: string;
  path: string;
  sha1hash: string;
  size: number;
  uploadId: string;
  url: string;
}
interface Metadata {
  dimensions: Dimensions;
}

interface Dimensions {
  _type: string;
  aspectRatio: number;
  height: number;
  width: number;
}

interface Button {
  _key: string;
  _type: string;
  href: string;
  title: string;
}
interface Title {
  _key: string;
  _type: string;
  children: Child[];
  markDefs: any[];
  style: string;
}

interface Child {
  _key: string;
  _type: string;
  marks: any[];
  text: string;
}

interface PolicyTitle {
  _key: string;
  _type: string;
  description: string;
  icon: Image;
  title: string;
}

interface NavMenu {
  _key: string;
  _type: string;
  href: string;
  title: string;
}

interface Nav {
  _key: string;
  _type: Type;
  nav?: Nav[];
  title: string;
  href?: string;
}

enum Type {
  Foooter = "foooter",
  FooterLinks = "footer.links",
}
interface Social {
  _key: string;
  _type: string;
  logo: Image;
  type: string;
  url: string;
}

interface Headline {
  _key: string;
  _type: string;
  children: Child[];
  markDefs: any[];
  style: string;
}

interface Review {
  _key: string;
  _type: string;
  description: string;
  image: Image;
  name: string;
}

interface Slug {
  _type: string;
  current: string;
}

interface LatestProduct {
  mainImage: Image;
  price?: number;
  slug: Slug;
  title: string;
  offer_price?: number;
  deals: Deal[];
}
interface Special {
  mainImage: Image;
  offer_price: number;
  price: number;
  slug: Slug;
  title: string;
  deals: Deal[];
}
interface BestSeller {
  mainImage: Image;
  offer_price?: number;
  price: number;
  slug: Slug;
  title: string;
  deals: Deal[];
  categories?: Category;
}
interface Deal {
  title: string;
}

interface SideMenuInfo {
  _type: string;
  assistance: Assistance;
  delivery: Delivery;
}

interface Assistance {
  email: Email[];
  number: string;
  title: string;
}

interface Email {
  _key: string;
  _type: string;
  children: Child[];
  markDefs: MarkDef[];
  style: string;
}
interface Delivery {
  info: Email[];
  title: string;
}

interface category {
  slug: Slug;
  title: string;
}

enum Availbility {
  InStock = "In Stock",
  PreOrder = "Pre Order",
  UpComing = "Up Coming",
}

interface Category {
  _key: string;
  _ref: string;
  _type: CategoryType;
}

//// redux
type Action = {
  type:
    | "dom/SHOW_SIDE_MENU"
    | "HIDE_SIDE_BAR"
    | "USER_LOG_IN"
    | "USER_LOG_OUT"
    | "SHOW_CART_SIDEBAR"
    | "HIDE_CART_SIDEBAR"
    | "SHOW_SEARCH_PAGE"
    | "HIDE_SEARCH_PAGE"
    | "SET_PAGE_WIDTH_ON_RESIZE"
    | "ADD_TO_THE_CART"
    | "PLUS_QUANTITY"
    | "MINUS_QUANTITY"
    | "ADD_ITEM"
    | "GET_ALL_PRODUCTS"
    | "SHOW_BACK_TO_THE_TOP"
    | "HIDE_BACK_TO_THE_TOP"
    | "SHOW_CATEGORIES_SIDEBAR"
    | "HIDE_CATEGORIES_SIDEBAR"
    | "LOADING_START"
    | "LOADING_END"
    | "CONFIRM_ORDER";

  payload?: any;
};
