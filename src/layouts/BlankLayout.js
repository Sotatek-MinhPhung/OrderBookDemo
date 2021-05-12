import React from 'react';
import TopNav from "../component/TopNav";

const BlankLayout = ({children}) => {
    return (
        <>
            <TopNav/>
            {children}
        </>
    )
}

export default BlankLayout