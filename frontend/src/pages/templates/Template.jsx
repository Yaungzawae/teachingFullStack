import NavBar from "@/components/ui/navbar/navbar"
import Footer from "@/components/ui/footer/Footer"

import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Template = (props) => {
    return (
        <Fragment>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </Fragment>
    )
}

export default Template;