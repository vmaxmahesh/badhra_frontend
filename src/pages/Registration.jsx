import React, { Component } from 'react';
import  '../../src/css/mystyle.css';
import  '../../src/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Registration extends Component {
  render() {
    return (
        <div>
          <div class="toptt"> </div>
      <div>
          <img src={ require('../../src/images/header_bg.jpg') } width="100%" alt="Bhadrachalam Ticket Booking" class="img-fluid" /> 
      </div>
      
      <div class="menu_head">
          Temple Accommodations
      </div>
      
      <div>
          <div class="wrapper bg-white">
      
              <h5>Registration</h5>
  
  
        
              
      <form class="pt-3" method="post" onSubmit={this.loginSubmit}>
          
          <div class="form-group py-2">
              <div class="input-field"> <span class="far fa-user p-2"></span> <input type="text" placeholder="Username " name="email" required class="" onChange={(e)=>{this.setState({email:e.target.value})}}/> </div>
          </div>
          
          <div class="form-group py-1 pb-2">
              <div class="input-field"> <span class="fas fa-lock p-2"></span> <input type="password" placeholder="Password" name ="password" required class="" onChange={(e)=>{this.setState({password:e.target.value})}}/> <button class="btn bg-white text-muted">				 
                  
              </button> 
              
              </div>
          </div> 
          
             <button class="btn btn-block text-center my-3 col-12 gradient_custom" id='btnsend'>Register</button>
         
      </form>
  </div>
      
      </div>
  
    <ToastContainer />
          </div>
      )
  }
}

export default Registration