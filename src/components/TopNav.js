import React, {useState} from "react"
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

const TopNav = () => {
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Navbar className="navbar-light my_nav" expand="lg">
            <NavbarBrand className="m-p ps-4 fw-bolder" href="#"> MY APP </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse className="justify-content-between"  isOpen={collapsed} navbar>
                <Nav navbar>
                    <NavItem className="ms-4 fw-bold">
                        <NavLink href="/request_order/">Buy/Sell</NavLink>
                    </NavItem>
                    <NavItem className="ms-4 fw-bold">
                        <NavLink href="/order_history/">Order History</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>

        </Navbar>
    )
}

export default TopNav