import React, { Component } from 'react'
import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import Dashoard from './admin/dashoard';
import Logout from './admin/Logout';
import CreateHotel from './admin/CreateHotel';
import CreateCottage from './admin/CreateCottage';
import CreateComplex from './admin/CreateComplex';
import AddRoom from './admin/AddRoom';
import CreateAmenity from './admin/CreateAmenity';
import EditeAmenity from './admin/EditeAmenity';
import EditCottage from './admin/EditCottage';
import EditComplex from './admin/EditComplex';
import ListCottages from './admin/ListCottages';
import ListComplex from './admin/ListComplex';
import EditRoom from './admin/EditRoom';
import AddAccommodation from './admin/AddAccommodation';


class PageRoutes extends Component {

  
  
  render() {
    return (
      <Routes>
        <Route exact path="/"  element={<Home/> }></Route>
        <Route exact path="/login"  element={<Login/> }></Route>
        <Route exact path="/registration"  element={<Registration/> }></Route>
        <Route exact path="/admin-dahsboard" element={<Dashoard/>}></Route>
        <Route exact path="/create-amenity" element={<CreateAmenity/>}></Route>
        <Route exact path="/create-hotel" element={<CreateHotel/>}></Route>
        <Route exact path="/create-cottage" element={<CreateCottage/>}></Route>
        <Route exact path="/create-complex" element={<CreateComplex/>}></Route>
        <Route exact path="/add-room" element={<AddRoom/>}></Route>


        <Route exact path="/book-acc" element={<AddAccommodation/>}></Route>


        <Route exact path="/edit-amenity/:id" element={  <EditeAmenity/> }></Route>
        <Route exact path="/edit-cottage/:id" element={  <EditCottage/> }></Route>
        <Route exact path="/edit-complex/:id" element={  <EditComplex/> }></Route>
        <Route exact path="/list-cottage" element={  <ListCottages/> }></Route>
        <Route exact path="/list-complex" element={  <ListComplex/> }></Route>

        <Route exact path="/edit-room/:id" element={  <EditRoom/> }></Route>

        
        <Route exact path="/logout" element={<Logout/>}></Route>
      </Routes>
    )
  }
}

export default PageRoutes