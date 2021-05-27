import React, {useState} from "react"
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import Login from "./Login";

const TopNav = () => {
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Navbar className="navbar-light my_nav" expand="lg">
            <NavbarBrand className="ms-4 fw-bolder" href="#"> ORDER BOOK </NavbarBrand>
            <NavbarToggler className="me-3" onClick={toggle}/>
            <Collapse className="justify-content-lg-between" isOpen={collapsed} navbar>
                <Nav navbar>
                    <NavItem className="ms-4 fw-bold">
                        <NavLink href="/request_order/">Buy/Sell</NavLink>
                    </NavItem>
                    <NavItem className="ms-4 fw-bold">
                        <NavLink href="/order_history/">Order History</NavLink>
                    </NavItem>
                </Nav>

                <Nav navbar>
                    <NavItem active={false} className="mx-4">
                        <Login/>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default TopNav