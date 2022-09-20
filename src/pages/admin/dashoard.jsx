import React, { Component } from 'react';
import Header from '../../../src/common/header';
import Footer from '../../../src/common/footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

class dashoard extends Component {

constructor(){
  super();
  this.state = {

    statistics:[]

  }
}

componentDidMount(){
  const config={
    headers: {
        Authorization : `Bearer ${localStorage.getItem("token")}`,
        'Content-Type':'multipart/form-data'
        
        }
}
const data = {
  token:localStorage.getItem("token"),
 
}
  axios.post('/dashboard',data,config).then((response)=>{

this.setState({
  statistics:response.data.dashboardData
});

  }).catch((error)=>{
    alert(error);

  });
}

  render() {

    var labelNames = [];
    var routeLinks = [];

    labelNames[1] = 'Cottages';
    labelNames[2] = 'Complex';
    routeLinks[1] = '/list-cottage';
    routeLinks[2] = '/list-complex';




    var staticsData = this.state.statistics.map((item, index)=>{

      


      return (
       <div class="col-sm-3">
        <div class="card">
              <div class="card-body">
              <h3 class="card-text">{item.count}</h3>
                <h6 class="">Number of { labelNames[item.type] }</h6>                
                <Link to={routeLinks[item.type]} href="#" class="btn btn-warning btn-sm"><i class="fa fa-eye"></i> View  </Link>
              </div>
            </div>
        </div>
      );



    });



    return (
      
      <div>
        
        
        <Header/>
        <p></p><p></p>
        <div style={{ textAlign:'middle'}}>
      <div class="container">
        <div class="row d-flex justify-content-center">

          { staticsData }       
            
         
         </div>
         </div>
         </div>

        
        <Footer/>
        </div>
    )
  }
}

export default dashoard