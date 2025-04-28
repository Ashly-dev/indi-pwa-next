import Banner from "@/Components/Banner";
import Featured from "@/Components/Featured";
import Layout from "@/Components/Layout";
import OfferHighlight from "@/Components/OfferHighlight";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Indibet | Landing</title>
      </Head>
      <Layout>
        <Banner />
        <Featured />
        <OfferHighlight />
      </Layout>
    </>
  );
}
