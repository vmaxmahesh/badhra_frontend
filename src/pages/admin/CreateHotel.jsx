import React, { Component } from 'react';
import Header from '../../../src/common/header';
import Footer from '../../../src/common/footer';

class CreateHotel extends Component {
  render() {
    return (
        <div>
            <Header/>
             
             <div class='container'>
                <br/>
             <h5>Create Hotel</h5>

                <form method="POST" action="">
                    
                    <div class="row">
                        <div class="col-md-3">
                        <div class="mb-3 mt-3">
                                <label for=" " class="form-label">Add Category</label>
                                <select class="form-select" name="category">
                                    <option value="">--Select Category--</option>
                                
                                </select>
                            <span class="err text-danger"></span>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="mb-3 mt-3">
                                <label for=" " class="form-label">Hotel/ Lodge Name</label>
                                <input type=" " class="form-control" id=" " placeholder="" name="hotel_name"/>
                                <span class="err text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3 mt-3">
                                <label for=" " class="form-label">Location</label>
                                <input type=" " class="form-control" id=" " placeholder="" name="location" />
                                <span class="err text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3 mt-3">
                                <label for=" " class="form-label">Owner Name</label>
                                <input type=" " class="form-control" id=" " placeholder="" name="owner_name"/>
                                <span class="err text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3 mt-3">
                                <label for=" " class="form-label">Owner Mobile Number</label>
                                <input type=" " class="form-control" id=" " placeholder="" name="mobile_number" />
                                <span class="err text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3 mt-3">
                                <label for=" " class="form-label">Hotel Contact no</label>
                                <input type=" " class="form-control" id=" " placeholder="" name="hotel_contact_no" />
                                <span class="err text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-2" >
                        <button type="submit" class="btn btn-danger mt_42">SUBMIT</button>
                    </div>
                    
                </div>
                </form>

              </div>
            <Footer/>
       </div>
    )
  }
}

export default CreateHotel