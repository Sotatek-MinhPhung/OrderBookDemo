import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {orderHistory, requestOrder} from "./index";

import Page404 from "../pages/error_page/Page404";

import BlankLayout from "../layouts/BlankLayout";

const childRoutes = (Layout, routes) =>
    routes.map(({ children, path, component: Component }, index) =>
        children ? (
            // Route item with children
            children.map(({ path, component: Component }, index) => (
                <Route
                    key={index}
                    path={path}
                    exact
                    render={props => (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            ))
        ) : (
            // Route item without children
            <Route
                key={index}
                path={path}
                exact
                render={props => (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )}
            />
        )
    );

const Routes = () => (
    <Router>
        <Switch>
            {childRoutes(BlankLayout, requestOrder)}
            {childRoutes(BlankLayout, orderHistory)}
            <Route
                render={() => (
                    <Page404 />
                )}
            />
        </Switch>
    </Router>
);

export default Routes;
