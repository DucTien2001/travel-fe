import React, { useEffect, useState } from 'react';
//import _ from 'lodash';
// import { useHistory } from 'react-router-dom';
import ApiService from 'services/ApiService.js';
import FooterBlack from "components/Footers/FooterBlack.js";
import PrivacyPolicySection from './privacy-policy-sections/PrivacyPolicySection';
import ScrollTransparentNavbar from 'components/Navbars/ScrollTransparentNavbar.js';

const PrivacyPolicy = () => {
    const [data, setData] = useState();

    useEffect(() => {
        (async function callApi () {
            const data = await ApiService.get('api/privacy-policy');
            setData(data);
        })();
    }, []);

    useEffect(() => {
        document.body.classList.add("presentation-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    
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
        <div data-background-color="dark-blue">
            <ScrollTransparentNavbar />
            <div className="wrapper">
                <PrivacyPolicySection data={data} /> 
                <FooterBlack />
            </div>
        </div>
    )
}

export default PrivacyPolicy;