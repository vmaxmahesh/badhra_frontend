import React, { Component } from 'react';
import Header from '../../../src/common/header';
import Footer from '../../../src/common/footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import EditeAmenity from './EditeAmenity';


class CreateAmenity extends Component {

    constructor(){
        super();
        this.state = {
            loaderClass:'',
            token:'',
            cottage_types:[],
            aminity_name:'',
            applicable_to:'',
            amenity_name_error:'',
            hotel_type_id_error:'',
            amenitieslist:[],
            details:[],
            items:[]

        }

        
    }


    

    componentDidMount(){

        this.getAmeniteis();

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







    getAmeniteis = () =>{
        this.setState({
            loaderClass:'loading',
        });

        const data = {
            token:localStorage.getItem("token"),
        }

        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }

        axios.post('/get-aminety',data,config).then((response)=>{

            

            
           
            

            this.setState({

                amenitieslist:response.data.amenities,
                loaderClass:'',
                
                
            });



        }).catch((error)=>{
            alert(error);
           
            console.log(error);

        });

    }

    formSubmit = (e) =>{

       

        e.preventDefault();
        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }
        const data={
            token:localStorage.getItem("token"),
            amenity_name:this.state.aminity_name,
            hotel_type_id:this.state.applicable_to,

        }

        axios.post('/add-aminety',data,config).then((response)=>{

           

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

                    this.setState({
                        aminity_name:'',
                        applicable_to:'',
                        amenity_name_error:'',
                        hotel_type_id_error:'',

                    })

            }else{
                
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

    deleteAmenity = (amenity_id) =>{

        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }
        const data={
            token:localStorage.getItem("token"),
            amenity_id:amenity_id,
            

        }

        axios.post('/delete-aminety',data,config).then((response)=>{

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

            }else{
                
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

        return (

            <option value={ item.id }>{ item.hotel_type_desc }</option>
        );

    });

    let i=0;

    let amenitislist = this.state.amenitieslist.map((item, index)=>{
        
        return (
        <tr>
            <td>{ i=i+1 }</td>
            <td>{ item.amenity_name }</td>
            <td>{ item.hotel_type_desc }</td>
            <td>
            <Link to={`/edit-amenity/${item.id}`} class="btn btn-warning btn-sm" >Edit </Link>
            
            </td>
            <td><button class="btn btn-danger btn-sm" onClick={()=>this.deleteAmenity(`${item.id}`)}>Delete</button></td>
            
        </tr>
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
         <h5>Create Amenity</h5>

            <form  onSubmit={this.formSubmit}>
                
                <div class="row">
                    <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Amenity name <span class="mandatory">*</span></label>
                            <input type="text" name="aminity_name" class="form-control" value={this.state.aminity_name} onKeyDown={this.nameonkeyDown}  onChange={this.nameOnchange}/>
                            <span class="errorcls">{ this.state.amenity_name_error }</span>
                    </div>
                </div>
                
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Applicable to <span class="mandatory">*</span></label>
                            <select class="form-select" name="applicable_to" value={this.state.applicable_to}   onChange={this.onTypeChange}>
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

            <br/>
            <div class="row">
                <div class="col-md-12"></div>
            <table class="table table-bordered table-striped">
                <thead>
                    <tr className='table-danger'>
                        <th>Sno</th>
                        <th>Amenity Name</th>
                        <th>Applicable to</th>
                        <th colspan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { amenitislist }
                </tbody>
            </table>
            </div>

            
            
            <ToastContainer />
          </div>
        <Footer/>
   </div>
    )
  }
}

export default CreateAmenity