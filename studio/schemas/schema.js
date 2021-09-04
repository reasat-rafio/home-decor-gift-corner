// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import category from './documents/category'
import deal from './documents/deal'
import product from './documents/product'
import brand from './documents/brand'
import siteConfig from './documents/siteConfig'
import tag from './documents/tag'

// import popup from "./documents/popup";

// Object types
import SEO from './objects/SEO'
import figure from './objects/figure'
import link from './objects/link'
import contactInfo from './objects/contactInfo'
import menuItem from './objects/menuItem'
import ctaButton from './objects/ctaButton'
import footer from './objects/footer'
import footerLinks from './objects/footerNav'
import social from './objects/social'
import sideMenuInfo from './objects/sideMenuInfo'

// Landing page sections
import hero from './objects/hero'
import imageSection from './objects/imageSection'
import textSection from './objects/textSection'

// Home page
import landing from './pages/landing'
import landingHome from './pages/ladning/home'
import landingPolicy from './pages/ladning/policy'
import landingReview from './pages/ladning/review'
import landingReviews from './pages/ladning/reviews'
import landingNewsLatter from './pages/ladning/newsletter'

//Order List
import Orders from './documents/order'
import orderedProducts from './objects/orderedProducts'

// User
import user from './documents/user'

// Contact
import contact from './pages/contact'
import contactUs from './pages/contact/contact-us'

import termsAndService from './pages/terms-and-service'
import privacyPolicy from './pages/privacy-policy'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    // We name our schema
    name: 'default',
    // Then proceed to concatenate our document type
    // to the ones provided by any plugins that are installed
    types: schemaTypes.concat([
        // The following are document types which will appear
        // in the studio.
        product,
        // popup,

        category,
        deal,
        brand,
        siteConfig,
        tag,
        // When added to this list, object types can be used as
        SEO,
        figure,
        link,
        hero,
        imageSection,
        textSection,
        contactInfo,
        menuItem,
        ctaButton,
        footer,
        footerLinks,
        social,
        sideMenuInfo,

        landing,
        landingHome,
        landingPolicy,
        landingReview,
        landingReviews,
        landingNewsLatter,

        contact,
        contactUs,

        termsAndService,
        privacyPolicy,

        Orders,
        orderedProducts,

        user,
    ]),
})
