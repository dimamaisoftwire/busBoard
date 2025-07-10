import React from "react";
import {Navigation} from "./Navigation";

const Layout = ({children} : {children:React.ReactElement}): React.ReactElement => {
    return(
        <div className="container-fluid vh-100 d-flex flex-column">
            <Navigation/>
            <main className="h-100 bg-dark">{children}</main>
            {/*<main style={{height:"90%"}}>{children}</main>*/}
        </div>
    )
}

export {Layout};