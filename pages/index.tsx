// import Banner from "@/Components/Banner";
// import Featured from "@/Components/Featured";
// import Layout from "@/Components/Layout";
// import OfferHighlight from "@/Components/OfferHighlight";
// import Head from "next/head";
// import { GetServerSideProps } from "next";

// interface HomeProps {
//   themeFolder: string;
// }

// export default function Home({ themeFolder }: HomeProps) {
//   return (
//     <>
//       <Head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Indibet | Landing</title>
//       </Head>
//       <Layout>
//         <Banner themeFolder={themeFolder} />
//         <Featured />
//         <OfferHighlight />
//       </Layout>
//     </>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const cr = query.cr as string | undefined;
//   const themeFolder = cr || "default"; // fallback

//   return {
//     props: {
//       themeFolder,
//     },
//   };
// };
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome Home</title>
      </Head>
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h1>Welcome to Indibet Landing Page!</h1>
      </div>
    </>
  );
}
