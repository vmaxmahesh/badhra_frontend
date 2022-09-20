import React, { Component } from 'react';
import Header from '../../../src/common/header';
import Footer from '../../../src/common/footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const rx_number = /^[+-]?\d*(?:[.,]\d*)?$/;
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
            no_pax_double:'',
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
            no_pax_double_error:'',
            per_day_fare_error:'',
            is_gst_applicable_error:'',
            showPopup :'none',
            file_status:true,
            checked:0




    
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

              handleLangitudeChange=(e)=>{
        
                const decimalnumber_only=/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        
                if(decimalnumber_only.test(e.target.value))
                this.setState({ langitude : e.target.value });
             
                else{
                  this.setState({ langitude : '' });
             
                }      
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

              alert('Please  Upload images only');
           

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
            loaderClass:'loading'
        })
       

        
        const data = new FormData();

        for (let i = 0; i < this.state.amenities_sel.length; i++) {
            data.append("amenity_sel[]", this.state.amenities_sel[i]);
          }

          for (let i = 0; i < this.state.image.length; i++) {
            data.append("images[]", this.state.image[i]);
          }
        data.append('type', 2); 
        
        data.append('token',localStorage.getItem("token"));
        data.append('name', this.state.hotel_name,);
        data.append('location',this.state.location,);
        data.append('latitude',this.state.latitude,);
        data.append('langitude',this.state.langitude);
        data.append('bedrooms_ac',this.state.ac_rooms);
        data.append('bedrooms_nonac',this.state.non_ac_rooms);
        data.append('no_pax',this.state.no_pax);
        data.append('no_pax_double',this.state.no_pax_double);
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

        axios.post('/create-complex',data,config).then((response)=>{
            

            if(response.data.status_code){
                // document.getElementById('createCottage').reset();
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

                        amenityselArray:[],
                        // amenitieslist:[],
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
                        no_pax_double:'',
                        per_day_fare:'',
                        is_gst_applicable:'',
                        gst_percent:'',
                        photos:[],
                        amenities_sel:[],
                        updatedList:[],
                        show_percent:'none',
                        updatedFileList:[],
                        image:[],
                        photosSelected:'',
                        hotel_name_error:'',
                        ac_rooms_error:'',
                        non_ac_rooms_error:'',
                        no_pax_error:'',
                        no_pax_double_error:'',
                        per_day_fare_error:'',
                        is_gst_applicable_error:'',

                        amenities_sel:'',
                        loaderClass:'',
                        photosSelected:[],
                        photos:[],
                        imagesArray:'',
                        image:[]
            


                    });


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


            // console.log(error.response.data);


            
            this.setState({


                hotel_name_error:error.response.data.errors.name,
               
                no_pax_error:error.response.data.errors.no_pax,
                no_pax_double_error:error.response.data.errors.no_pax_double,
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



    }

    getAmeniteis = () =>{

        this.setState({
            loaderClass:'loading'
        })
        

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

    listCottages = () =>{
        this.setState({
            loaderClass:'loading',
        });
        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }

        const data = {
            token:localStorage.getItem("token"),
            hotel_type_id:2,
        }

        axios.post('/list-complex',data,config).then((response)=>{

           
            
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

        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }
        const data={
            token:localStorage.getItem("token"),
            cottage_id:cottageid,
            

        }

        axios.post('/delete-cottage',data,config).then((response)=>{

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



      




  render() {

    let amenitislist = this.state.amenitieslist.map((item, index)=>{
        return (

    <div class="col-md-3">
            <div class="form-check">
                <input className="form-check-input" type="checkbox"   defaultChecked={this.state.checked} value={item.id} id="amenities" name="amenities_sel[]" onChange={this.chandleCheck}/>
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
                <td>{item.latitude}</td>
                <td>{item.langitude}</td>
                <td>{item.no_pax}</td>
                <td>{item.pox_double}</td>
                <td><div>{stringv}</div></td>
                <td><button class="btn btn-primary" onClick={()=>this.getPhotos(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModal"> View Photos </button></td>
                <th><Link to={`/edit-complex/${item.id}`} class="btn btn-warning" > Edit </Link></th>
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
         <h5>Create Complex  </h5>

            <form method="POST" action="" id="createCottage" enctype="multipart/form-data" onSubmit={this.formSubmit}>
                
                <div class="row">
                    
                
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Name of complex <span class="mandatory">*</span></label>
                            <input type="text" class="form-control" id=" " placeholder="" value={this.state.hotel_name} name="hotel_name" onChange={this.handleCottageNameChange} />
                            <span class="err text-danger">{ this.state.hotel_name_error }</span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Location</label>
                            <input type="text" class="form-control" id=" " value={this.state.location} placeholder="" name="location" onChange={this.handleLocationNameChange} />
                            <span class="err text-danger"></span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Latitude</label>
                            <input type="text" class="form-control" id=" " placeholder="" value={this.state.latitude} name="latitude" onChange={this.handleLatitudeChange} />
                            <span class="err text-danger"></span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Longitude</label>
                            <input type="text" class="form-control" id=" " placeholder="" value={this.state.langitude} name="langitude" onChange={this.handleLangitudeChange} />
                            <span class="err text-danger"></span>
                    </div>
                </div>
                

                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Max Pax for Single Occupancy (Including Children above 6 years) <span class="mandatory">*</span></label>
                            <select class="form-select" name="no_pax" value={this.state.no_pax} onChange={(e)=>{this.setState({no_pax:e.target.value})}}>
                                <option value="">-- Select --</option>
                                
                                { paxdrpdwn }
                            
                            </select>
                            <span class="err text-danger">{ this.state.no_pax_error }</span>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Max Pax for Double Occupancy (Including Children above 6 years) <span class="mandatory">*</span></label>
                            <select class="form-select" name="no_pax_double" value={this.state.no_pax_double} onChange={(e)=>{this.setState({no_pax_double:e.target.value})}}>
                                <option value="">-- Select --</option>
                                
                                { paxdrpdwn }
                            
                            </select>
                            <span class="err text-danger">{ this.state.no_pax_double_error }</span>
                    </div>
                </div>

               

                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Photos of Complex    </label>
                            <input type="file" class="form-control"    
 multiple key={this.state.file_status} placeholder="" name="image"  value={this.state.photosSelected} onInput={this.photosSelected}/>
                            <span class="err text-danger"></span>
                    </div>
                </div>

                </div>
                 <h6>Available Amenities:</h6><br/>
                <div class="row">
                { amenitislist } 
                </div>
                <div className='row'>

                <div class="col-md-2" >
                    <button type="submit" class="btn btn-danger mt_42">SUBMIT</button>
                </div>
                
            </div> 
            </form>
            <p></p>

            <div class="row">
                <div class="col-md-12">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr className='table-danger'>
                                <th>Sno</th>
                                <th>Name of Complex</th>
                                <th>Location</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Max Pax for Single Occupancy (Including Children above 6 years)</th>
                                <th>Max Pax for Double Occupancy (Including Children above 6 years)</th>
                                <th>Aminities</th>

                                <th>View Photos</th>
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