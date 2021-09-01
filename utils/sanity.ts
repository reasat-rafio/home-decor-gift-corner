import { setupNextSanity } from 'next-sanity-extra'
import sanityClient from '@sanity/client'

// Standard sanity config
// Don't forget:
// Setup SANITY_API_TOKEN (created from sanity admin)
/// Set SANITY_PREVIEW_TOKEN (generate this yourself)

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error("Couldn't find env var NEXT_PUBLIC_SANITY_PROJECT_ID!")
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error("Couldn't find env var NEXT_PUBLIC_SANITY_DATASET")
}

const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
}

export const { imageUrlBuilder, PortableText, sanityStaticProps, useSanityQuery } =
    setupNextSanity(config)

export const sanity = setupNextSanity(config)

export const previewClient = sanityClient({
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
})
