import type { NextPage } from "next";
import dynamic from "next/dynamic";
import LandingPage from "./landingPage";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  return <LandingPage />;
};

export default Home;

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale)),
//     },
//   };
// }
