import React, { Component } from 'react';
import Header from '../../../src/common/header';
import Footer from '../../../src/common/footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';






class EditeAmenity extends Component {
     
    constructor(props){
        super(props);
        const pathname = window.location.pathname;
        const amenity_id = pathname.substring(pathname.lastIndexOf('/') + 1);
        this.getSingleAmenityDetails(amenity_id);

        this.state = {
            cottage_types:[],
            loaderClass:'loading',
            singleAmenityDetails:[],
            token:'',
            items:[],
            name:'',
            editdata:'',
            aminity_name:'',
            applicable_to:'',
            amenity_name_error:'',
            hotel_type_id_error:'',
            amenity_id:'',
            
        }

        
    }
    componentDidMount(){

        
        

        this.setState({
            amenity_id:this.state.amenity_id
        });
        
        
        



        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }
        
        const data={
            token:localStorage.getItem("token"),
            
        }

        axios.post('/get-hotel-types',data,config).then((response)=>{

            this.setState({
                cottage_types:response.data.hotel_types,
            });

            

        }).catch((error)=>{
            console.log(error);
        });

       





    }


    nameOnchange=(e)=>{
        this.setState({
            aminity_name:e.target.value,
            amenity_name_error:''


        })
    }



    nameonkeyDown=(e)=>{


        if(e.keyCode == '8'){
            this.setState({
                amenity_name_error:'The amenity name field is required'

            })
        }

    }


    onTypeChange=(e)=>{


        console.log(e.target.value)

        if(e.target.value == ''){

            this.setState({
                applicable_to:e.target.value,

                hotel_type_id_error:'The hotel type id field is required',

            })

        }

        else{


            this.setState({
                applicable_to:e.target.value,
                hotel_type_id_error:''
    
            })

        }

     


        
    }


    getSingleAmenityDetails = (amenity_id)=>{

        this.setState({
            loaderClass:'loading',
        });
       
        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }

        const data={
            token:localStorage.getItem("token"),
            amenity_id:amenity_id
        }

        

        axios.post('/get-aminety-details',data,config).then((response)=>{
           
            this.setState({
                loaderClass:'',
            });
            this.setState({
                singleAmenityDetails:response.data.amenities,
                aminity_name:response.data.amenities.amenity_name,
                applicable_to:response.data.amenities.hotel_type_id

            });

            

        }).catch((error)=>{
            console.log(error);
        });
    }




    formSubmit = (e) =>{

       

        e.preventDefault();
        this.setState({
            loaderClass:'loading',
        });
        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }
        const data={
            token:localStorage.getItem("token"),
            amenity_name:this.state.aminity_name,
            hotel_type_id:this.state.applicable_to,
            amenity_id:this.state.singleAmenityDetails.id

        }
        

        axios.post('/edit-aminety',data,config).then((response)=>{

            this.setState({
                loaderClass:'',
            });

            if(response.data.status_code){
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    
                    
                    });
                    window.location='/create-amenity';

            }else{

                console.log(response.data);
                
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    
                    
                    });

            }

            this.getAmeniteis();

            

        }).catch((error)=>{
            this.setState({
                loaderClass:'',
            });

            if(error.response.data.errors){
                this.setState({
                    amenity_name_error:error.response.data.errors.amenity_name,
                    hotel_type_id_error:error.response.data.errors.hotel_type_id,
                });
                
            }
            
            
            console.log(error.response.data.errors.amenity_name);
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                
                
                });
        });

    }


    

    

  render() {

    
   
    let ctypes = this.state.cottage_types.map((item,key)=>{
        let selected='';
        if(this.state.singleAmenityDetails.hotel_type_id==item.id){
            selected='selected';
        }
        return (
            

            <option value={ item.id } selected={ selected }>{ item.hotel_type_desc }</option>
        );

    });
    return (

      <div>
        <Header/>
        <div>
            <div class={this.state.loaderClass}>
    
                <div style={ this.state.loaderStyle } ></div>
    
            </div>
        </div>
        <div class='container'>
            <br/>
         <h5>Edit Amenity</h5>

            <form  onSubmit={this.formSubmit}>
                
                <div class="row">
                    <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Amenity name <span class="mandatory">*</span></label>
                            <input type="text"  name="aminity_name" class="form-control"  onKeyDown={this.nameonkeyDown} value={this.state.aminity_name} onChange={this.nameOnchange}/>
                            <span class="errorcls">{ this.state.amenity_name_error }</span>
                    </div>
                </div>
                
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Applicable to <span class="mandatory">*</span></label>
                            <select class="form-select" name="applicable_to" onChange={this.onTypeChange}>
                                <option value="">--Select Category--</option>
                                { ctypes }
                            
                            </select>
                            <span class="errorcls">{ this.state.hotel_type_id_error }</span>
                            
                    </div>
                </div>
               
                
                
                
                <div class="col-md-2" >
                    <button type="submit" class="btn btn-danger mt_42">SUBMIT</button>
                </div>
                
            </div>
            </form>

            
            <ToastContainer />
          </div>

        <Footer/>
        </div>
    )
  }
}

export default EditeAmenity