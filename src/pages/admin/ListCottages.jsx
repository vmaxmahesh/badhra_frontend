import React, { Component } from 'react';
import Header from '../../../src/common/header';
import Footer from '../../../src/common/footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class ListCottages extends Component {
 

    

    state = {
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
        alert();
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
      imagesArray.push(e.target.files[i]);
    }
    this.setState({
      image: imagesArray,
    });
    
   
};


formSubmit = (e) => {
    e.preventDefault();

    

   

    
   

    
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
        

        if(response.data.status_code){
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


    this.setState({
        loaderClass:'',
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



  




render() {

let amenitislist = this.state.amenitieslist.map((item, index)=>{
    return (

<div class="col-md-3">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value={item.id} id="amenities" name="amenities_sel[]" onChange={this.chandleCheck}/>
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

console.log(this.state.cottagesList);

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
            <td>{item.bedrooms_ac}</td>
            <td>{item.bedrooms_nonac}</td>
            <td>{item.bedrooms_ac+item.bedrooms_nonac}</td>
            <td>{item.no_pax}</td>
            <td>{item.fare_per_day}</td>
            <td>{ynlist[item.is_gst_applicable]}</td>
            <td>{item.gst_percent}</td>
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
     <h5>List Cottages </h5>

       
        <p></p>

        <div class="row">
            <div class="col-md-12 table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr className='table-danger'>
                            <th>Sno</th>
                            <th>Name of cottage</th>
                            <th>Location</th>
                            <th>Latitude</th>
                            <th>longitude</th>
                            <th>Number of AC bed Rooms</th>
                            <th>Number of Non-AC Bed Rooms</th>
                            <th>Total Beds</th>
                            <th>Maximum number of Pax (Including Children age above 5 years)</th>
                            <th>Fare Per Day in Rs</th>
                            <th>GST applicable?</th>
                            <th>GST percentage</th>
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

export default ListCottages