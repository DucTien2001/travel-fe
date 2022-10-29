import LandingPage from "pages/landingPage";
import Login from "pages/auth/login";
import Profile from "pages/profile";
import SidebarLayout from "components/Layout/SidebarLayout";
const publicRoutes = [
    {path: '/', components: LandingPage},
    {path: '/auth/login', components: Login},
    {path: '/profile', components: Profile, layout: SidebarLayout}
]; 

// const privateRoutes = [];

export { publicRoutes };