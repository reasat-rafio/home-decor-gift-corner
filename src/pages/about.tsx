import { GetStaticProps } from "next";
import { SanityProps } from "next-sanity-extra";
import { aboutQuery } from "../../libs/query";
import { sanityStaticProps, useSanityQuery } from "../../utils/sanity";
import { Layout } from "../components/common/Layout/Layout";

export const getStaticProps: GetStaticProps = async (context) => ({
  props: await sanityStaticProps({ query: aboutQuery, context }),
  revalidate: 10,
});

export default function Abouut(props: SanityProps) {
  const {
    data: { site },
  } = useSanityQuery(aboutQuery, props);

  return (
    <Layout {...site}>
      <div>aboutQuery</div>
    </Layout>
  );
}
