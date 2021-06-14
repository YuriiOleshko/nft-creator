import React from 'react';
import Header from "../Header";
import Footer from "../Footer/Footer";

const Layout = ({children}) => {
    return (
        <>
             <Header/>
        <main className="main">
                {children}
                <Footer/>
</main>
        </>
    );
};

export default Layout;
