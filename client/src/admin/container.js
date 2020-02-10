import React, {Component} from 'react';
import View from './view';
import {Navbar,NavbarBrand} from 'reactstrap';

class Container extends Component{
  render(){
    return(
      <div>
       <Navbar color="light" light expand="md">
        <NavbarBrand
          className="nav-brand"
       
        >
          Admin
        </NavbarBrand>
      </Navbar>
        
   
      <View />
    
      </div>
    );
  }
}

export default Container;