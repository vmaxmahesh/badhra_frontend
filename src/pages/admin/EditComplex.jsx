import React, { Component } from 'react';
import Header from '../../../src/common/header';
import Footer from '../../../src/common/footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { validationLatitudeLongitude } from "validation-latitude-longitude";
const rx_number = /^[+-]?\d*(?:[.,]\d*)?$/;
const text_allowonly=/^[a-zA-Z\s\.]*$/;


class EditComplex extends Component {

    constructor(){
        super();
        const pathname = window.location.pathname;
            const hotel_id = pathname.substring(pathname.lastIndexOf('/') + 1);
            this.getSingleCottageDetails(hotel_id);
            this.getPhotos(hotel_id);
    
            this.state = {
                hotel_id:hotel_id,
                loaderClass:'',
                amenityselArray:[],
                amenitieslist:[],
                cottagesList:[],
                cottageAmenitisList:[],
                cottagePhotos:[],
                selAmenities:[],
                hotel_name:'',
                location:'',
                owner_name:'',
                owner_mobile:'',
                latitude:'',
                langitude:'',
                ac_rooms:'',
                non_ac_rooms:'',
                no_pax:'',
                pax_double:'',
                per_day_fare:'',
                is_gst_applicable:'',
                gst_percent:'',
                photos:[],
                amenities_sel:[],
                updatedList:[],
                show_percent:'none',
                updatedFileList:[],
                image:[],
                hotel_name_error:'',
                ac_rooms_error:'',
                non_ac_rooms_error:'',
                no_pax_error:'',
                pax_double_error:'',
                is_gst_applicable_error:'',
                showPopup :'none',
                file_status:true,

        
        
        
            }
    }

    componentDidMount(hotel_id){

        this.getSingleCottageDetails(hotel_id);



    }


    


    handleLatitudeChange=(e)=>{

        const decimalnumber_only=/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        
        if(decimalnumber_only.test(e.target.value))
        this.setState({ latitude : e.target.value });
     
        else{
          this.setState({ latitude : '' });
     
        }       
      }
    
    
    
      handleLongitudeChange=(e)=>{


        const decimalnumber_only=/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        
        if(decimalnumber_only.test(e.target.value))
        this.setState({ langitude : e.target.value });
     
        else{
          this.setState({ langitude : '' });
     
        }     
    
      
      
      }


      handleLocationNameChange = (e) => {
        if (text_allowonly.test(e.target.value)){
            this.setState({ location : e.target.value });

        }else{
            this.setState({location:''})
        }

         }




         handleNameChange = (e) => {
                this.setState({ hotel_name : e.target.value });
    
          
    
             }





    
        
    getSingleCottageDetails = (hotel_id) =>{


        this.setState({
            loaderClass:'loading'
        })
    
        
    
            const config={
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
            }
            const data={
                token:localStorage.getItem("token"),
                hotel_id:hotel_id,
                
        
            }
        
            axios.post('/get-single-cottage-details',data,config).then((response)=>{
    
               
        
                this.setState({
                    cottagesList:response.data.cottagesList,
                    selAmenities:response.data.selectedAmenities,
                    hotel_name:response.data.cottagesList.name,
                    location:response.data.cottagesList.location,
                    owner_name:response.data.cottagesList.owner_name,
                    owner_mobile:response.data.cottagesList.hotel_mobile,
                    latitude:response.data.cottagesList.latitude,
                    langitude:response.data.cottagesList.langitude,
                    ac_rooms:response.data.cottagesList.bedrooms_ac,
                    non_ac_rooms:response.data.cottagesList.bedrooms_nonac,
                    no_pax:response.data.cottagesList.no_pax,
                    pax_double:response.data.cottagesList.pox_double,
                    per_day_fare:response.data.cottagesList.fare_per_day,
                    is_gst_applicable:response.data.cottagesList.is_gst_applicable,
                    gst_percent:response.data.cottagesList.gst_percent,
                    
    
                        });

                        response.data.selectedAmenities.map((item2, index2)=>{

                            this.state.amenityselArray.push(item2.id);
                        });
    
                        this.getAmeniteis();

                        this.setState({
                            loaderClass:''
                        })
    
        
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
        
    
     
    
    chandleCheck = (event) => {

    
   
        if (event.target.checked) {
        
            this.state.amenityselArray.push(event.target.value);
        } else {


            for (let i = 0; i < this.state.amenityselArray.length; i++) {
            
                if(this.state.amenityselArray[i] == event.target.value){
    
                    var myIndex=i;
                }
    
            }

            this.state.amenityselArray.splice(myIndex, 1);

            
        //   var myIndex = this.state.amenityselArray.indexOf(event.target.value);
        //   if (myIndex !== -2) {
        //     this.state.amenityselArray.splice(myIndex, 1);
        //   }
          
        }   
        console.log(this.state.amenityselArray);
        this.setState({
            amenities_sel:this.state.amenityselArray
        });
       
        
        
      };
    
    
      photosSelected = (e) => {

        const imagesArray = [];
        let isValid = "";
   
        for (let i = 0; i < e.target.files.length; i++) {    

            if(e.target.files[i].size >= '5000000'){
                alert("please upload below 5 mb file");

                this.setState({
                    file_status:0,
                    photosSelected:''
                })
            }

       
               else if(e.target.files[i].type == 'image/jpeg' || e.target.files[i].type == 'image/png'  || e.target.files[i].type == 'image/jpg'   &&  e.target.files[i].size >= '5000000'){

            imagesArray.push(e.target.files[i]);


            this.setState({
                image: imagesArray,


              });


        }
        else{

            this.setState({
                file_status: '',

              });

              alert('Please  Upload images only');
           

        }
        }
       
       
       
    };
    
    formSubmit = (e) => {
        e.preventDefault();


        this.setState({
            loaderClass:'loading'
        })
    
        
    
        
        const data = new FormData();
    
        for (let i = 0; i < this.state.amenityselArray.length; i++) {
            data.append("amenity_sel[]", this.state.amenityselArray[i]);
          }

    
          for (let i = 0; i < this.state.image.length; i++) {
            data.append("images[]", this.state.image[i]);
          }
        data.append('type', 2); 
        data.append('hotel_id', this.state.hotel_id); 
        data.append('token',localStorage.getItem("token"));
        data.append('name', this.state.hotel_name);
        data.append('location',this.state.location);
        data.append('latitude',this.state.latitude);
        data.append('langitude',this.state.langitude);
        data.append('bedrooms_ac',this.state.ac_rooms);
        data.append('bedrooms_nonac',this.state.non_ac_rooms);
        data.append('no_pax',this.state.no_pax);
        data.append('pax_double',this.state.pax_double);
        data.append('fare_per_day',this.state.per_day_fare);
        data.append('is_gst_applicable',this.state.is_gst_applicable);
        data.append('gst_percent',this.state.gst_percent);
        data.append('is_gst_applicable',this.state.is_gst_applicable);
    
        
        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
                'Content-Type':'multipart/form-data'
                
                }
        }
    
        axios.post('/edit-complex',data,config).then((response)=>{
            
    
            if(response.data.status_code== '200'){
                //document.getElementById('createCottage').reset();
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
                        hotel_name_error:'',
                        ac_rooms_error:'',
                        non_ac_rooms_error:'',
                        no_pax_error:'',
                        no_pax_double_error:'',
                        per_day_fare_error:'',
                        is_gst_applicable_error:'',
                        file_status:'',
                        loaderClass:'',
                        photosSelected:[],
                        photos:[],
                        imagesArray:'',
                        image:[]
                    })


                    this.getPhotos(this.state.hotel_id);



    
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
    
    
    
        }).catch((error)=>{
    
    
            console.log(error);
    
    
            
            this.setState({
    
                hotel_name_error:error.response.data.errors.name,
                
                no_pax_error:error.response.data.errors.no_pax,
                pax_double_error:error.response.data.errors.pax_double,
                loaderClass:'',

               
    
            });
    
            
    
    
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
    
        this.getPhotos(this.state.hotel_id);

        this.setState({
        })
    


    
    
    }
    
    getAmeniteis = () =>{
        
    
        const data = {
            token:localStorage.getItem("token"),
            hotel_type_id:2,
        }
    
        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }
    
        axios.post('/get-aminety',data,config).then((response)=>{
            
    
           
            this.setState({
    
                amenitieslist:response.data.amenities,
                
                
                
            });
    
    
    
        }).catch((error)=>{
            alert(error);
           
            
    
        });
    
    }
    
    
    deletePhoto = (photo_id) =>{
        
    
    
        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }
        const data={
            token:localStorage.getItem("token"),
            photo_id:photo_id,
            
    
        }
    
        axios.post('/delete-hotel-image',data,config).then((response)=>{
    
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

                    this.getPhotos(this.state.hotel_id);

    
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
    
    
    
        this.getPhotos(this.state.hotel_id);
        
    
    
    } 
    
    
    
    getPhotos = (cottageid) => {
        
        
        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }
        const data={
            token:localStorage.getItem("token"),
            cottage_id:cottageid,
            
    
        }
    
        axios.post('/get-hotel-photos',data,config).then((response)=>{
    
            this.setState({
                cottagePhotos:response.data.photos,
            });
    
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
        
    
    let amenitislist = this.state.amenitieslist.map((item, index)=>{
    
        var checked = '';
    
        this.state.selAmenities.map((item2, index2)=>{
            
            
            if(item2.amenity_id == item.id){
                checked = 'checked';
                
    
            }
    });
        return (
    
    <div class="col-md-3">
            <div class="form-check">
                <input class="form-check-input" defaultChecked={checked}  type="checkbox" value={item.id} id="amenities" name="amenities_sel[]" onInput={this.chandleCheck} />
                <label class="form-check-label" for="flexCheckDefault" >
                { item.amenity_name }
                </label>
            </div>
    </div>
        );
    
    });
    
    
    
    
    
    let ynlist = [];
    ynlist[1] ='Yes';
    ynlist[2] ='No';
    
    
    
    let photos = this.state.cottagePhotos.map((item,index)=>{
    
        return (
    
            
            
                <div class="card" style={{ width: '17rem'}}>
                <img class="card-img-top" src={item.file_url} alt ={item.file_url} />
                <div class="card-body">
                    {/* <h5 class="card-title">Card title</h5> */}
                    <button class="btn btn-warning" onClick={()=>this.deletePhoto(item.id)} type="button">Delete Photo</button>
                </div>
                </div>
                
    
    
    
        );
    
    });
    
    var paxdrpdwn =[];
    var selected='';
    
    for(var i=1;i<=15;i++){
        if(i==this.state.cottagesList.no_pax){
            selected = 'selected';
        }else{
            selected = '';
        }
        paxdrpdwn.push(<option value={i} selected={ selected }>{i}</option>);
    }

    var paxdrpdwn2 =[];
    var selected='';
   
    for(var i=1;i<=15;i++){
        if(i==this.state.cottagesList.pox_double){
            selected = 'selected';
        }else{
            selected = '';
        }
        paxdrpdwn2.push(<option value={i} selected={ selected }>{i}</option>);
    }
    
    let ynvalues = ynlist.map((item,index)=>{
    
        let selected = "";
        if(this.state.cottagesList.is_gst_applicable === index){
            selected = "selected";
            this.state.show_percent='block';
            
            
        }
    
        return(
    
            <option value={index} selected={ selected} >{ item }</option>
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
         <h5>Edit Complex </h5>
    
            <form method="POST" action="" id="createCottage" enctype="multipart/form-data" onSubmit={this.formSubmit}>
                
                <div class="row">
                    
                
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Name of Complex <span class="mandatory">*</span></label>
                            <input type="text" class="form-control" id=" " placeholder="" defaultValue={this.state.hotel_name} name="hotel_name"  onInput={this.handleNameChange}  />
                            <span class="err text-danger">{ this.state.hotel_name_error }</span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Location</label>
                            <input type="text" class="form-control" id=" " placeholder="" value={this.state.location} name="location" onInput={this.handleLocationNameChange}/>
                            <span class="err text-danger"></span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Latitude</label>
                            <input type="text" class="form-control" id=" " placeholder="" name="latitude" value={this.state.latitude} onInput={this.handleLatitudeChange}/>
                            <span class="err text-danger"></span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Longitude</label>
                            <input type="text" class="form-control" id=" " placeholder="" name="langitude" value={this.state.langitude} onInput={this.handleLongitudeChange}/>
                            <span class="err text-danger"></span>
                    </div>
                </div>
               
    
                
    
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Max Pax for Single Occupancy (Including Children above 6 years) <span class="mandatory">*</span></label>
                            <select class="form-select" name="no_pax" onChange={(e)=>{this.setState({no_pax:e.target.value})}}>
                                <option value="">-- Select --</option>
                                
                                { paxdrpdwn }
                            
                            </select>
                            <span class="err text-danger">{ this.state.no_pax_error }</span>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Max Pax for Double Occupancy (Including Children above 6 years)<span class="mandatory">*</span></label>
                            <select class="form-select" name="pax_double" onChange={(e)=>{this.setState({pax_double:e.target.value})}}>
                                <option value="">-- Select --</option>
                                
                                { paxdrpdwn2 }
                            
                            </select>
                            <span class="err text-danger">{ this.state.pax_double_error }</span>
                    </div>
                </div>
    
               
    
                
    
                
    
    
    
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Photos of Cottage    </label>
                            <input type="file" class="form-control"    
 multiple key={this.state.file_status} placeholder="" name="image"  onChange={this.photosSelected}/>                            <span class="err text-danger"></span>
                    </div>
                </div>
    
                </div>
                <h6>Previous Photos:</h6>
                <br/>
                <div className='row'>
                    { photos }
                </div>
                <h6>Available Amenities:</h6><br/>
                <div class="row">
                { amenitislist } 
    
                <div class="col-md-2" >
                    <button type="submit" class="btn btn-danger mt_42">SUBMIT</button>
                </div>
                
            </div>
            </form>
            <p></p>
    
            <ToastContainer />
    
          </div>
        <Footer/>
    </div>
    )
    }
    }
export default EditComplex