import React from "react";
// javascript library that creates a parrallax effect
import Rellax from "rellax";
import aws4 from 'aws4';
import axios from 'axios';
// reactstrap components

// core components
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import PresentationHeader from "components/Headers/PresentationHeader.js";
import FooterBlack from "components/Footers/FooterBlack.js";

// sections for this page
import Components from "./presentation-sections/Components.js";
import BasicComponents from "./presentation-sections/BasicComponents.js";
import Cards from "./presentation-sections/Cards.js";
import Content from "./presentation-sections/Content.js";
import Sections from "./presentation-sections/Sections.js";
import Examples from "./presentation-sections/Examples.js";
import FreeDemo from "./presentation-sections/FreeDemo.js";
import Icons from "./presentation-sections/Icons.js";
import Image from "./presentation-sections/Image.js";
import Testimonials from "./presentation-sections/Testimonials.js";
import Pricing from "./presentation-sections/Pricing.js";
import { Auth } from 'aws-amplify';

function Presentation() {
  React.useEffect(() => {
    // calling api
   (async function callApi(){
      console.log('calling api');
      const user = await Auth.currentAuthenticatedUser();

      console.log({user});
      // get credentials 
      const credentials = await Auth.currentCredentials();

      // get access token 
      // const session = await Auth.currentSession();
      // const accessToken = session.getAccessToken();
      console.log({credentials});

      let request = {
        host: 'zau2jqgg2l.execute-api.ap-southeast-2.amazonaws.com',
        method: 'GET',
        url: 'https://zau2jqgg2l.execute-api.ap-southeast-2.amazonaws.com/prod/login',
        path: '/prod/login'
      }
      
      let signedRequest = aws4.sign(request,
        {
          // assumes user has authenticated and we have called
          // AWS.config.credentials.get to retrieve keys and
          // session tokens
          secretAccessKey: credentials.secretAccessKey,
          accessKeyId: credentials.accessKeyId,
          sessionToken: credentials.sessionToken,
          // accessToken
        })
      delete signedRequest.headers['Host']
      delete signedRequest.headers['Content-Length']
      
      const response = await axios(signedRequest);

      console.log({response});

    })()
  }, []);
  React.useEffect(() => {
    document.body.classList.add("presentation-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    // initialise Rellax for this page
    if (window.innerWidth >= 991) {
      setTimeout(function () {
        new Rellax(".rellax", {
          center: true,
        });
      }, 5000);
      new Rellax(".rellax-header");
      new Rellax(".rellax-text");
    }

    // we need to add a script for the github buttons
    let script = document.createElement("script");
    script.src = "https://buttons.github.io/buttons.js";
    script.id = "github-buttons-script-id";
    document.body.appendChild(script);

    return function cleanup() {
      document.body.classList.remove("presentation-page");
      document.body.classList.remove("sidebar-collapse");

      // we need to remove the script when we change the page
      script.parentNode.removeChild(script);
    };
  });
  return (
    <>
      <ScrollTransparentNavbar />
      <div className="wrapper">
        <PresentationHeader />
        <Components />
        <BasicComponents />
        <Cards />
        <Content />
        <Sections />
        <Examples />
        <FreeDemo />
        <Icons />
        <Image />
        <Testimonials />
        <Pricing />
        <FooterBlack />
      </div>
    </>
  );
}

export default Presentation;
