import NavBar from "@/components/ui/navbar/navbar";
import Footer from "@/components/ui/footer/Footer";
import { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Template = (props) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <Fragment>
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="flex-1">
                    <Outlet />
                </main>
                {!isAdminRoute && <Footer/>}
            </div>
        </Fragment>
    );
};

export default Template;