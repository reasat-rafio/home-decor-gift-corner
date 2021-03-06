import { groq } from 'next-sanity'
import { withDimensions } from 'sanity-react-extra'

export const siteQuery = `
  "site": *[_id == "siteConfig"][0] {
    ...,
    "logo": ${withDimensions('logo')},
    footer {
      ...,
      socials[] {
      ...,
      "logo": ${withDimensions('logo')},
      },
    },
  },
`

const newslatter = `
  "newslatter": *[_id == "newslatter"][0]{
    headline,
    description,
    ctaButton
  },
`

const productCardQuery = (queryName: string, dealName: string) => `
"${queryName}": *[_type == "product" && (deals[0]->.title == "${dealName}" || deals[1]->.title == "${dealName}" || deals[2]->.title == "${dealName}")]|order(_createdAt desc)[0...4] {
  "mainImage": ${withDimensions('mainImage')},
      _id,   
      slug,
      title,
      price,
      offer_price,
      deals[]->{
        title
      },
},
`
export const homeQuery = groq`{
    ${siteQuery}
    "landingPage": *[_id == "landingPage"][0] {
        ...,
        "poster": ${withDimensions('poster')},
        seo{
          ...,
          "seoImage": ${withDimensions('seoImage')},
        },
         screens[] {
            ...,
            "backgroundImage": ${withDimensions('backgroundImage')},
            "icon": ${withDimensions('icon')},
            title[]{
              ...,
              "icon": ${withDimensions('icon')},
            },
            reviews[]{
              ...,
              "image": ${withDimensions('image')},
            },
        },
    },

    ${productCardQuery('offer', 'Limited')}
    ${productCardQuery('bestSeller', 'Best Seller')}
    ${productCardQuery('special', 'Special')}
    "deals": *[_type == "deal"][]{
      title
    },
    "latestProduct": *[_type == "product"]|order(_createdAt desc)[0...10]{
      "mainImage": ${withDimensions('mainImage')},
      _id,
      slug,
      title,
      price,
      offer_price,
      availbility
    },
    "allProducts":  *[_type == "product"]{
      "mainImage": ${withDimensions('mainImage')},
      _id,
      slug,
      title,
      price,
      offer_price,
      availbility
    }
}`

export const shopQuery = groq`{
  ${siteQuery}
  "category" : *[_type == "category"] | order(order asc){
    slug,
    title
  },
  "products": *[_type == "product"][]{
    availbility,
    categories,
    "mainImage": ${withDimensions('mainImage')},
    _id,
    price,
    slug,
    title
  },

}`

export const contactQuery = groq`{
  ${siteQuery}
  ${newslatter}
  "contact" : *[_type == "contact"][0]{
    ...,
    seo {
        ...,
        "seoImage": ${withDimensions('seoImage')},
     },
    contactUs{
      ...,
      info[]{
        ...,
        "icon": ${withDimensions('icon')},
      },
      "locationImage": ${withDimensions('locationImage')},
    }
  }
}`

export const checkoutQuery = groq`{
  ${siteQuery}
  ${newslatter}
}`

export const aboutQuery = groq`{
  ${siteQuery}
}`

export const productQuery = groq`{
  ${siteQuery}
  "product": *[_type == "product" && slug.current == $product][0] {
    _id,
    availbility,
    body,
    categories,
    deals[0]->,
    "mainImage": ${withDimensions('mainImage')},
    "images": ${withDimensions('images[]')},
    price,
    price,
    tags[],
    title,
    offer_price,
    slug,
    brand->{
      name,
      "logo": ${withDimensions('logo')},
    },
    "related_product": *[_type == "product" && references(^.tags[]._ref)][0...10]{
    availbility,
    categories,
    "mainImage": ${withDimensions('mainImage')},
    price,
    slug,
    title
    }
  }, 
}`

export const categoryQuery = groq`{
  ${siteQuery}
  "products": *[_type == "product" && categories[0]->.slug.current == $category][]{
    availbility,
    categories,
    "mainImage": ${withDimensions('mainImage')},
    _id,
    price,
    slug,
    title
  },
  "category" : *[_type == "category"] | order(order asc){
    slug,
    title
  },
}`

export const orderQuery = groq`{
  ${siteQuery}
  ${newslatter}
  "order": *[_type == "order" &&_id == $order][0]{
    ...,
    orderedProducts[]{
      ...,
      product->{
        title,
        price,
        offer_price
      }
    }
  }
}`

export const termsAndServicesQuery = groq`{
    ${siteQuery}
    "termsAndServices" : *[_type == "termsAndServices"][0]  {
      ...,
      seo {
        ...,
        "seoImage": ${withDimensions('seoImage')},
     },
    }
}`

export const privacyPoliciesQuery = groq`{
  ${siteQuery}
  "privacyPolicy" : *[_type == "privacyPolicy"][0] {
    ...,
    seo {
        ...,
        "seoImage": ${withDimensions('seoImage')},
     },
  } 
}`
