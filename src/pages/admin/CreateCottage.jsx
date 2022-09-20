import React, { Component } from 'react';
import Header from '../../../src/common/header';
import Footer from '../../../src/common/footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const rx_number =/^\d+$/;
const text_allowonly=/^[a-zA-Z\s\.]*$/;

class CreateCottage extends Component {

    constructor() {
        super();
        this.state = {
            loaderClass:'',
            amenityselArray:[],
            amenitieslist:[],
            cottagesList:[],
            cottageAmenitisList:[],
            cottagePhotos:[],
            hotel_name:'',
            location:'',
            owner_name:'',
            latitude:'',
            langitude:'',
            ac_rooms:'',
            non_ac_rooms:'',
            no_pax:'',
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
            per_day_fare_error:'',
            is_gst_applicable_error:'',
            showPopup :'none',
            file_status:1,
            total:0,
            checked:0,
            image_error:''



    
        }

      }

      
       

      handleCottageNameChange = (e) => {
        this.setState({ hotel_name : e.target.value });
        // if (text_allowonly.test(e.target.value)){
            

        // }else{
        //     this.setState({hotel_name:''})
        // }

         }



         handleLocationNameChange = (e) => {
            this.setState({ location : e.target.value });
            // if (text_allowonly.test(e.target.value)){
                
    
            // }else{
            //     this.setState({location:''})
            // }
    
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




      

      handlenoofAcBedrooms=(e)=>{


                if(rx_number.test(e.target.value)){

                    var acroomvalues = parseInt(document.getElementById('ac_rooms').value);
                var nonacroomvalues = parseInt(document.getElementById('non_ac_rooms').value);
                if(isNaN(acroomvalues)){
                    acroomvalues=0;
                }
                if(isNaN(nonacroomvalues)){
                    nonacroomvalues=0;
                }
                
                var t = parseInt(acroomvalues) + parseInt(nonacroomvalues);
                this.setState({ 
                    ac_rooms : e.target.value,
                    total: t,
                });
                

                }

                else{

                    let acroom_values = parseInt(document.getElementById('ac_rooms').value);

                    let nonac_roomvalues = parseInt(document.getElementById('non_ac_rooms').value);   

                    if(isNaN(acroom_values)){
                        acroom_values=0;
                         }

                    if(isNaN(nonac_roomvalues)){
                        nonac_roomvalues=0;
                    }


                    let t = parseInt(acroom_values) + parseInt(nonac_roomvalues);



                    this.setState({
                        ac_rooms:'',
                        total: t,


                    })
                }

               

        
      }

      handlenoofNonAcBedrooms=(e)=>{



        if(rx_number.test(e.target.value)){

        
        var acroomvalues = parseInt(document.getElementById('ac_rooms').value);
        var nonacroomvalues = parseInt(document.getElementById('non_ac_rooms').value);
        if(isNaN(acroomvalues)){
            acroomvalues=0;
        }
        if(isNaN(nonacroomvalues)){
            nonacroomvalues=0;
        }
        var t = parseInt(acroomvalues) + parseInt(nonacroomvalues);
        this.setState({ 
            non_ac_rooms : e.target.value ,
            total: t,
        });

         }

         else{


        
                let acroomvalues = parseInt(document.getElementById('ac_rooms').value);
                let nonacroomvalues = parseInt(document.getElementById('non_ac_rooms').value);
                if(isNaN(acroomvalues)){
                    acroomvalues=0;
                }
                if(isNaN(nonacroomvalues)){
                    nonacroomvalues=0;
                }
                let t = parseInt(acroomvalues) + parseInt(nonacroomvalues);

                
                this.setState({ 
                    non_ac_rooms :'' ,
                    total: t,
                });
        
                 

         }
      }


      handleperDayFareChange=(e)=>{
        if (rx_number.test(e.target.value))
        this.setState({ per_day_fare : e.target.value });
      }

      handlePercentageChange=(e)=>{

        if (rx_number.test(e.target.value))
            this.setState({ gst_percent : e.target.value });
    }

    

    componentDidMount(){

      

        

            this.getAmeniteis();
            this.listCottages();

    }

    chandleCheck = (event) => {
        //var amenityselArray = [];
        
        if (event.target.checked) {
            
            this.state.amenityselArray.push(event.target.value);
        } else {
            
          var myIndex = this.state.amenityselArray.indexOf(event.target.value);
          if (myIndex !== -1) {
            this.state.amenityselArray.splice(myIndex, 1);
          }
          
        }

        
        
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

              alert('Please  Upload PNG,JPG,JPEG  images only');
           

        }

           


        }
       
       
       
    };



     unCheck() {
        var x = document.getElementsByClassName("form-check-input");
        for(var i=0; i<=x.length; i++) {

            console.log(x[i]);
           x[i].checked = false;
         }   
      }


    formSubmit = (e) => {
        e.preventDefault();


        this.setState({
            loaderClass:'loading',
        })

       const data = new FormData();

        for (let i = 0; i < this.state.amenities_sel.length; i++) {
            data.append("amenity_sel[]", this.state.amenities_sel[i]);
          }

          for (let i = 0; i < this.state.image.length; i++) {
            data.append("images[]", this.state.image[i]);
          }
        data.append('type', 1); 
        
        data.append('token',localStorage.getItem("token"));
        data.append('name', this.state.hotel_name,);
        data.append('location',this.state.location,);
        data.append('latitude',this.state.latitude,);
        data.append('langitude',this.state.langitude);
        data.append('bedrooms_ac',this.state.ac_rooms);
        data.append('bedrooms_nonac',this.state.non_ac_rooms);
        data.append('no_pax',this.state.no_pax);
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

        axios.post('/create-cottage',data,config).then((response)=>{
            

            if(response.data.status_code == '200'){
                
               
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

                        hotel_name:'',
                        location:'',
                        latitude:'',
                        langitude:'',
                        non_ac_rooms:'',
                        ac_rooms:'',
                        no_pax:'',
                        per_day_fare:'',
                        gst_percent:'',
                        is_gst_applicable:'',
                        amenities_sel:[],
                        hotel_name_error:'',
                        ac_rooms_error:'',
                        non_ac_rooms_error:'',
                        no_pax_error:'',
                        per_day_fare_error:'',
                        is_gst_applicable_error:'',
                        gst_percent_error:'',
                        amenityselArray:[],
                        image_error:'',


                        amenityselArray:[],
                        // amenitieslist:[],
                        total:'',
                        photosSelected:[],
                        photos:[],
                        imagesArray:'',
                        image:[]


                       
                        


                    })


                    this.listCottages();



                    this.unCheck();

                  






                   



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
                ac_rooms_error:error.response.data.errors.bedrooms_ac,
                non_ac_rooms_error:error.response.data.errors.bedrooms_nonac,
                no_pax_error:error.response.data.errors.no_pax,
                per_day_fare_error:error.response.data.errors.fare_per_day,
                is_gst_applicable_error:error.response.data.errors.is_gst_applicable,
                gst_percent_error:error.response.data.errors.gst_percent,
                image_error:error.response.data.errors.images,

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

        this.listCottages();


    }

    getAmeniteis = () =>{

        this.setState({
            loaderClass:'loading',
        })
        

        const data = {
            token:localStorage.getItem("token"),
            hotel_type_id:1,
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

    listCottages = () =>{
       

       
        
        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }

        const data = {
            token:localStorage.getItem("token"),
            hotel_type_id:1,
        }

        axios.post('/list-cottage',data,config).then((response)=>{

            

           
            
            this.setState({

                cottagesList:response.data.cottagesList,
                cottageAmenitisList:response.data.cottageAmenities,
                loaderClass:'',

                
                
            });


           
            


            

            



        }).catch((error)=>{
            alert(error);
           
            console.log(error);

        });




        
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

    deleteHotel = (cottageid) => {
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
            cottage_id:cottageid,
            

        }

        axios.post('/delete-hotel',data,config).then((response)=>{

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

            this.listCottages();

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


    handleLatitudeChange=(e)=>{
        
        const decimalnumber_only=/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

        if(decimalnumber_only.test(e.target.value))
        this.setState({ latitude : e.target.value });
     
        else{
          this.setState({ latitude : '' });
     
        }      
      }

      handleLangitudeChange=(e)=>{
        
        const decimalnumber_only=/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

        if(decimalnumber_only.test(e.target.value))
        this.setState({ langitude : e.target.value });
     
        else{
          this.setState({ langitude : '' });
     
        }      
      }
      




  render() {

    let amenitislist = this.state.amenitieslist.map((item, index)=>{
        return (

    <div class="col-md-3">
            <div class="form-check">
                <input className="form-check-input"   defaultChecked={this.state.checked} type="checkbox" c value={item.id} id="amenities" name="amenities_sel[]" onChange={this.chandleCheck}/>
                <label class="form-check-label" for="flexCheckDefault" >
                { item.amenity_name }
                </label>
            </div>
    </div>
        );

    });


    

    let j=0;
    let ynlist = [];
    ynlist[1] ='Yes';
    ynlist[2] ='No';

    let cottagesList = this.state.cottagesList.map((item, index)=>{
       
        

        let stringv = ""; 


        stringv = item.amenities.map((amt,i)=>{


                    return(

                        <p>{amt.amenity_name}</p>

                    );
            
            

        });

       

        return (
            <tr>


                <td>{ j=j+1 }</td>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.bedrooms_ac}</td>
                <td>{item.bedrooms_nonac}</td>
                <td>{item.no_pax}</td>
                <td>{item.fare_per_day}</td>
                <td>{ynlist[item.is_gst_applicable]}</td>
                <td>{item.gst_percent}</td>
                <td>{item.latitude}</td>
                <td>{item.langitude}</td>
                <td>{item.bedrooms_ac+item.bedrooms_nonac}</td>

                <td><button class="btn btn-primary" onClick={()=>this.getPhotos(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModal"> View Photos </button></td>
                <td>
                    <div>

                        {stringv}

                   
                    
                    </div>

                </td>
                <th><Link to={`/edit-cottage/${item.id}`} class="btn btn-warning" > Edit </Link></th>
                <th><button class="btn btn-danger" onClick={()=>this.deleteHotel(item.id)}> Delete </button></th>

            </tr>

    
        );

    });

    let photos = this.state.cottagePhotos.map((item,index)=>{

        return (

            <div className='col-md-3'>
                <img src={item.file_url} width="75px" height='75'></img>
            </div>
        );

    });

    var paxdrpdwn =[];

    for(var i=1;i<=15;i++){
        paxdrpdwn.push(<option>{i}</option>);
    }


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
         <h5>Create Cottage  </h5>

            <form method="POST" action="" id="formid" enctype="multipart/form-data" onSubmit={this.formSubmit}>
                
                <div class="row">
                    
                
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Name of cottage <span class="mandatory">*</span></label>
                            <input type="text" class="form-control" id="hotel_name" placeholder="" name="hotel_name" value={this.state.hotel_name} onChange={this.handleCottageNameChange}/>
                            <span class="err text-danger">{ this.state.hotel_name_error }</span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Location</label>
                            <input type=" " class="form-control" id="location" placeholder="" name="location" onChange={this.handleLocationNameChange} value={this.state.location}/>
                            <span class="err text-danger"></span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Latitude</label>
                            <input type="text" class="form-control" id="latitude" placeholder="" name="latitude" 
        value={this.state.latitude} onInput={this.handleLatitudeChange}/>
                            <span class="err text-danger"></span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Longitude</label>
                            <input type="text" class="form-control" id="langitude" placeholder="" name="langitude"  onInput={this.handleLangitudeChange} value={this.state.langitude}/>
                            <span class="err text-danger"></span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Number of AC bed Rooms <span class="mandatory">*</span></label>
                            <input type="text"  class="form-control" id="ac_rooms" placeholder="" name="ac_rooms"  onChange={this.handlenoofAcBedrooms} value={this.state.ac_rooms}/>
                            <span class="err text-danger">{ this.state.ac_rooms_error }</span>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Number of Non-AC Bed Rooms <span class="mandatory">*</span></label>
                            <input type="text"  class="form-control" id="non_ac_rooms" placeholder="" name="non_ac_rooms" onChange={this.handlenoofNonAcBedrooms} value={this.state.non_ac_rooms}/>
                            <span class="err text-danger">{ this.state.non_ac_rooms_error }</span>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Total <span class="mandatory">*</span></label>
                            <input type=" " class="form-control" id="non_ac_rooms" placeholder="" name="non_ac_rooms"  value={this.state.total}/>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Maximum number of Pax (Including Children age above 5 years) <span class="mandatory">*</span></label>
                            <select class="form-select" id="no_pax" name="no_pax"  value={this.state.no_pax} onChange={(e)=>{this.setState({no_pax:e.target.value})}}>
                                <option value="">-- Select --</option>
                                
                                { paxdrpdwn }
                            
                            </select>
                            <span class="err text-danger">{ this.state.no_pax_error }</span>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Fare Per Day in Rs  <span class="mandatory">*</span></label>
                            <input type="text" class="form-control" id="fareperday" placeholder="" name="per_day_fare" onChange={this.handleperDayFareChange} value={this.state.per_day_fare}/>
                            <span class="err text-danger">{ this.state.per_day_fare_error }</span>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">GST applicable?  <span class="mandatory">*</span></label>
                            <select class="form-select" value={this.state.is_gst_applicable} name="is_gst_applicable" onChange={(e)=>{
                               
                                if(e.target.value==1){
                                    var s = 'block';

                                }else{
                                    var s = 'none';
                                }
                                
                                this.setState({is_gst_applicable:e.target.value,show_percent:s})
                                
                                }}>
                                <option value="">-- Select --</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            
                            </select>
                            <span class="err text-danger">{ this.state.is_gst_applicable_error }</span>
                    </div>
                </div>

                


                <div class="col-md-3" style={{display: this.state.show_percent}}>
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label" >percentage  <span class="mandatory">*</span></label>
                            <input type=" " class="form-control" id=" " placeholder="" name="gst_percent" onChange={this.handlePercentageChange} value={this.state.gst_percent}/>
                            <span class="err text-danger">{this.state.gst_percent_error}</span>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Photos of Cottage </label>
                            <input type="file" class="form-control"    
 multiple key={this.state.file_status} placeholder="" name="image"  value={this.state.photosSelected} onInput={this.photosSelected}/>
                            <span class="err text-danger">{this.state.image_error}</span>
                    </div>
                </div>

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

            <div class="row">
                <div class="col-md-12 table-responsive">
                    <table class="table table-bordered  table-responsive">
                        <thead>
                            <tr className='table-danger'>
                                <th>Sno</th>
                                <th>Name of cottage</th>
                                <th>Location</th>
                                <th>Number of AC bed Rooms</th>
                                <th>Number of Non-AC Bed Rooms</th>
                                <th>Maximum number of Pax (Including Children age above 5 years)</th>
                                <th>Fare Per Day in Rs</th>
                                <th>GST applicable?</th>
                                <th>GST percentage</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Total No of Beds</th>
                                <th>View Photos</th>

                                <th>Amenities</th>
                                <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { cottagesList }
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Photos</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className='row'>

        { photos }
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>



            <ToastContainer />

          </div>
        <Footer/>
   </div>
    )
  }
}

export default CreateCottage