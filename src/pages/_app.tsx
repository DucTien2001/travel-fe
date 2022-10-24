import "styles/globals.css";
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/react-demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
import './index.scss';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import LayoutAuth from "components/Layout/DefaultLayout";
import LayoutEnterprise from "components/Layout/EnterpriseLayout";
import { config } from "@fortawesome/fontawesome-svg-core";
import {publicRoutes} from "routes";
config.autoAddCss = false; 
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutAuth>
      <Component {...pageProps} />
    </LayoutAuth>
    
  )
}

export default MyApp;
