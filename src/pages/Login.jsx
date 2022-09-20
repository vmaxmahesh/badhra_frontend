
// Import area

import React, { Component } from 'react';
import  '../../src/css/mystyle.css';
import  '../../src/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';



// start class

class Login extends Component {

constructor(props){
    super(props);
    this.state={
        email:'',
        password:'',
        message:'',
        loggedIn:'false',
    }
    
}


loginSubmit = (e) =>{
  document.getElementById('btnsend').innerHTML='Sending';
  e.preventDefault();
   var data  = {
    email:this.state.email,
    password:this.state.password
  }
  

      const config={
        header:{
              'Content-Type': 'application/json',
              
        }
      }

  axios.post('/login',data,config).then((response)=>{

   
    if(response.data.status_code===200){

      localStorage.setItem('token',response.data.token);
      ///sessionStorage.setItem("token", response.data.token);
      this.setState({
        loggedIn:'true'
      });
     
    }

  }).catch((error)=>{

    
    if(error.response.data.status_code===401){

      document.getElementById('btnsend').innerHTML='Log in';
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
        
        });



      this.setState({
        message:error.response.data.message,
      });
    }

  });

}
// {this.state.message &&  <div class='alert alert-danger'>{ this.state.message }</div> }

  render() {

    if(localStorage.getItem("token")){
      return <Navigate to="/admin-dahsboard" />
    }

    


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
    
			<h5>Login</h5>


      
			
    <form class="pt-3" method="post" onSubmit={this.loginSubmit}>
		
        <div class="form-group py-2">
            <div class="input-field"> <span class="far fa-user p-2"></span> <input type="text" placeholder="Username " name="email" required class="" onChange={(e)=>{this.setState({email:e.target.value})}}/> </div>
        </div>
		
        <div class="form-group py-1 pb-2">
            <div class="input-field"> <span class="fas fa-lock p-2"></span> <input type="password" placeholder="Password" name ="password" required class="" onChange={(e)=>{this.setState({password:e.target.value})}}/> <button class="btn bg-white text-muted">				 
				
			</button> 
			
			</div>
        </div> 
		
		   <button class="btn btn-block text-center my-3 col-12 gradient_custom" id='btnsend'>Log in</button>
       
    </form>
</div>
	
	</div>

  <ToastContainer />
        </div>
    )
  }
}

export default Login