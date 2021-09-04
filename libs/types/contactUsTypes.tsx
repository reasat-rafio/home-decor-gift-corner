import { SanityImage } from 'sanity-react-extra'

export interface ContactUsProps {
    _createdAt: Date
    _id: string
    _rev: string
    _type: string
    _updatedAt: Date
    contactUs: ContactUs
    seo: SEO
}

export interface ContactUs {
    info: Info[]
    locationImage: SanityImage
    titile: string
}

export interface Info {
    _key: string
    _type: string
    description: any[]
    title: string
    icon: SanityImage
}

export interface Metadata {
    dimensions: Dimensions
}

export interface Dimensions {
    _type: string
    aspectRatio: number
    height: number
    width: number
}
