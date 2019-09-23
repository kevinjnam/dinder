import React from 'react';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavLink, NavItem, Row } from 'reactstrap';

const Header = ({ showFavs, toggleHeader, isOpen}) => (
    <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">Dinder</NavbarBrand>
        <NavbarToggler onClick={toggleHeader} className="mr-2" />
        <Collapse isOpen={!isOpen} navbar>
            <Nav navbar>
                <NavItem>
                    
                        {showFavs}
                    
                </NavItem>
            </Nav>
            


        </Collapse>




    </Navbar>


    
        // <div>
        //     <button onClick={showFavs}>Show Favs</button>
        // </div>
);

export default Header;

{/* <div>
<Navbar color="faded" light>
  <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
  <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
  <Collapse isOpen={!this.state.collapsed} navbar>
    <Nav navbar>
      <NavItem>
        <NavLink href="/components/">Components</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>
</div> */}