import React from 'react';
import TopNav from "../components/TopNav";

const BlankLayout = ({children}) => {
    return (
        <div className="d-flex flex-column align-content-center">
            <TopNav/>
            {children}
        </div>
    )
}

export default BlankLayout