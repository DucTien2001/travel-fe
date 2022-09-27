import LandingPage from "pages/landingPage";
import Login from "pages/auth/login";
import Signup from "pages/auth/signup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowsRotate, faCreditCard  } from '@fortawesome/free-solid-svg-icons';
import Profile from "pages/profile";
export interface Item {
    path: string;
    name: string;
    icon?: any;
    component?: any;
    layout?: string;
  }

 export const userProfileRoutes: Item[] = [
    {path: '/', name: 'User Profile', icon: faUser},
    {path: '/profile/changePassword', name: 'Change password', icon: faArrowsRotate},
    {path: '/profile/PaymentDetail', name: 'Payment detail', icon: faCreditCard}
]; 