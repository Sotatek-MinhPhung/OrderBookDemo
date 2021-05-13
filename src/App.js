import React from 'react'
import store from "./store/store";
import Provider from "react-redux/lib/components/Provider";
import Routes from "./route/Routes";
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/stylesheet.css"

const App = () => (
    <>
        <Provider store={store}>
            <Routes/>
            {/*toast*/}
        </Provider>
    </>
);

export default App;
