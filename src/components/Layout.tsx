import React from "react";
import {Navigation} from "./Navigation";

const Layout = ({children} : {children:React.ReactElement}): React.ReactElement => {
    return(
        <div style={{height:720}}>
            <Navigation/>
            <main style={{height:"90%"}}>{children}</main>
        </div>
    )
}

export {Layout};