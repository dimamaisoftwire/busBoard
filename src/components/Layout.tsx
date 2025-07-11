import React from "react";
import {Navigation} from "./Navigation";

const Layout = ({children} : {children:React.ReactElement}): React.ReactElement => {
    return(
        <div className="container-fluid vh-100 d-flex flex-column p-0">
            <Navigation/>
            <main className="bg-dark vh-100">{children}</main>
        </div>
    )
}

export {Layout};