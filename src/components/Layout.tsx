import React from "react";
import {Navigation} from "./Navigation";

const Layout = ({children} : {children:React.ReactElement}): React.ReactElement => {
    return(
        <>
            <Navigation />
            <main>{children}</main>
        </>
    )
}

export {Layout};