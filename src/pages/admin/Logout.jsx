import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class Logout extends Component {

componentDidMount(){

    

    localStorage.clear();;
    
}

  render() {

    return <Navigate to="/login" />


    
  }
}

export default Logout