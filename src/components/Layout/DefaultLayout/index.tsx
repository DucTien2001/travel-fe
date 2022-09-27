import React from "react";
import WhiteNavbar from "components/Navbars/TransparentNavbar";
import Footer from "components/Footer";
interface Props { 
    children: React.ReactNode;
}

const LayoutAuth = ({children}: Props) => {
    return (
        <>
            <WhiteNavbar/>
            <div>
                {children}
            </div>
            <Footer/>
        </>
    )
}

export default LayoutAuth;