import React, { Component } from 'react';
import { Link,Navigate } from 'react-router-dom';
import  '../../src/css/mystyle.css';
import  '../../src/css/bootstrap.min.css';
import axios from 'axios';
//axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

class header extends Component {

  

 render() {

  

    if(!localStorage.getItem('token')){

      return <Navigate to={'/logout'} />
    }

    return (
      <div>


          <div>
            <div class="toptt"> </div>
              <div>
                    <img src={ require('../../src/images/header_bg.jpg') }  width="100%" alt="Bhadrachalam Ticket Booking" class="img-fluid" /> 
              </div>
              
              <div class="menu_head">
		              Temple Accommodations 
	            </div>
              <div class=" d-flex justify-content-center" style={{ background:'#d68837'}}>
    
    <nav class="navbar navbar-expand-sm">
        
  <div class="container-fluid d-flex justify-content-center justify-content-sm-start">
    
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
     <i class="fas fa-bars"></i>
    </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">    
                      <ul class="navbar-nav">
                      <li class="nav-item  ">
                         <Link to='/admin-dahsboard' class="nav-link  text-white " href=""><i class=""></i> Home</Link>
                      </li>
                  
                          <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                               Create 
                            </a>
                            <ul class="dropdown-menu " aria-labelledby="navbarDarkDropdownMenuLink" >
                            <li><Link to="/create-amenity" class="dropdown-item" href="#">Create Amenity</Link></li>
                              
                              <li><Link to="/create-cottage" class="dropdown-item" href="#">Create a Cottage</Link></li>
                              <li><Link to="/create-complex" class="dropdown-item" href="#">Create a Complex</Link></li>
                              <li><Link to="/add-room" class="dropdown-item" href="#">Add rooms </Link></li>
                            </ul>
                          </li>
                          <li class="nav-item  ">
                         <Link to="/logout" class="nav-link  text-white " href=""><i class=""></i> Logout</Link>
                      </li>
                      </ul>
                </div>
                </div>
                </nav>
                </div>


          </div>
      </div>
    )
  }
}

export default header