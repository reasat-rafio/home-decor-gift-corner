import { GetStaticProps } from 'next'
import { SanityProps } from 'next-sanity-extra'
import { NextSeo } from 'next-seo'
import { openGraphImages } from '../../libs/helpers'
import { contactQuery } from '../../libs/query'
import { sanityStaticProps, useSanityQuery } from '../../utils/sanity'
import { Layout } from '../components/common/Layout/Layout'
import { Newsletter } from '../components/common/newsletter'
import ContactForm from '../components/contact/contact-form'
import ContactInfoBlock from '../components/contact/contact-info'
import Container from '../ui/container'

export const getStaticProps: GetStaticProps = async (context) => ({
    props: await sanityStaticProps({ query: contactQuery, context }),
    revalidate: 10,
})

export default function Contact(props: SanityProps) {
    const {
        data: { site, contact, newslatter },
    } = useSanityQuery(contactQuery, props)

    return (
        <Layout {...site}>
            <NextSeo
                title={contact.seo.title}
                description={contact.seo.description}
                openGraph={{
                    images: openGraphImages({ img: contact.seo.seoImage }),
                }}
            />
            <Container className="py-section">
                <div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
                    <div className="md:w-full lg:w-2/5 2xl:w-2/6 flex flex-col h-full">
                        <ContactInfoBlock contact={contact} />
                    </div>
                    <div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full md:ms-7 flex-col lg:ps-7">
                        <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
                            <h4 className="text-2xl 2xl:text-3xl font-bold text-heading">
                                Get in touch
                            </h4>
                        </div>
                        <ContactForm />
                    </div>
                </div>
                <Newsletter newsletter={newslatter} />
            </Container>
        </Layout>
    )
}
