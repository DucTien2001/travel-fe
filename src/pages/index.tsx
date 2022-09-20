import type { NextPage } from "next";
import dynamic from "next/dynamic";
import LandingPage from "./landingPage";

const WhiteNavbar = dynamic(
  () => import("components/Navbars/WhileNavbar"),
  { ssr: false }
);

const Home: NextPage = () => {
  return (
    <>
      {/* <WhiteNavbar /> */}
      <LandingPage/>
    </>
  );
};

export default Home;
