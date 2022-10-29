import type { NextPage } from "next";
import dynamic from "next/dynamic";
import LandingPage from "./landingPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {publicRoutes} from "routes/index";

const Home: NextPage = () => {
  return (
      <LandingPage/>
  );
};

export default Home;
