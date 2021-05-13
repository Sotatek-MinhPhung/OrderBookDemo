import React from 'react';
import TopNav from "../components/TopNav";

const BlankLayout = ({children}) => {
    return (
        <>
            <TopNav/>
            {children}
        </>
    )
}

export default BlankLayout