import { GetStaticProps } from "next";
import { SanityProps } from "next-sanity-extra";
import { contactQuery } from "../../libs/query";
import { sanityStaticProps, useSanityQuery } from "../../utils/sanity";
import { Layout } from "../components/common/Layout/Layout";

export const getStaticProps: GetStaticProps = async (context) => ({
  props: await sanityStaticProps({ query: contactQuery, context }),
  revalidate: 10,
});

export default function Contact(props: SanityProps) {
  const {
    data: { site },
  } = useSanityQuery(contactQuery, props);

  return (
    <Layout {...site}>
      <div>Contact</div>
    </Layout>
  );
}
