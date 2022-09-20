import React, { Component } from 'react';
import Header from '../../../src/common/header';
import Footer from '../../../src/common/footer';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const rx_number = /^[+-]?\d*(?:[.,]\d*)?$/;

class AddRoom extends Component {

    constructor(props){
        super(props);
        
        this.state = {

            cottagesList:[],
            bedTypes:[],
            hotel_id:'',
            hotel_id_error:'',
            room_no:'',
            room_no_error:'',
            bedTypeSel:'',
            bedTypeSelError:'',
            amenitieslist:[],
            amenityselArray:[],
            roomsList:[]
        }
    }

    



    handleRoomChange=(e)=>{
        if (rx_number.test(e.target.value))
        this.setState({ room_no : e.target.value });
      }

    componentDidMount(){

        
        this.listRooms();
        this.listCottages();
        this.listBedTypes();

    }

    


    listRooms = () =>{
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
        }

        axios.post('/list-rooms',data,config).then((response)=>{

           
            this.setState({

                roomsList:response.data.roomDetails,
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


    deleteRoom = (room_id) => {
        

        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
                }
        }
        const data={
            token:localStorage.getItem("token"),
            id:room_id,
            

        }

        axios.post('/delete-room',data,config).then((response)=>{

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

            this.listRooms();

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






    listBedTypes = () =>{

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
            hotel_type_id:500,
        }

        axios.post('/get-bed-types',data,config).then((response)=>{

           
            
            this.setState({

                bedTypes:response.data.bedTypesData,
                
                
                
            });



        }).catch((error)=>{
            alert(error);
           
            console.log(error);

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
            hotel_type_id:500,
        }

        axios.post('/list-cottage',data,config).then((response)=>{

           
            
            this.setState({

                cottagesList:response.data.cottagesList,
                
                loaderClass:''
                
            });



        }).catch((error)=>{
            alert(error);
           
            console.log(error);

        });


        this.setState({
            loaderClass:'',
        });


        
    }

    getAmenities = (event) =>{

       this.setState({
        hotel_id: event.target.value
       });

       const config={
        headers: {
            Authorization : `Bearer ${localStorage.getItem("token")}`
            }
    }
    const data={
        token:localStorage.getItem("token"),
        hotel_id:event.target.value,
        

    }
    axios.post('/get-single-cottage-details',data,config).then((response)=>{

    
        this.setState({
            
            amenitieslist:response.data.selectedAmenities,
            

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

chandleCheck = (event) => {
    
   
    
    if (event.target.checked) {
        
        this.state.amenityselArray.push(event.target.value);
    } else {
      var myIndex = this.state.amenityselArray.indexOf(event.target.value);
      if (myIndex !== -1) {
        this.state.amenityselArray.splice(myIndex, 1);
      }
      
    }

   };

   formSubmit = (event) =>{
    

    event.preventDefault();

    

    
 


const data = new FormData();

        for (let i = 0; i < this.state.amenityselArray.length; i++) {
            data.append("amenity_sel[]", this.state.amenityselArray[i]);
          }

         
        
        
        data.append('token',localStorage.getItem("token"));
        data.append('hotel_id', this.state.hotel_id);
        data.append('room_no',this.state.room_no);
        data.append('bedTypeSel',this.state.bedTypeSel);
       
        

        
        const config={
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
                'Content-Type':'multipart/form-data'
                
                }
        }


 axios.post('/add-room-details',data,config).then((response)=>{
    
    

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

        
            hotel_id:'',
            hotel_id_error:'',
            room_no:'',
            room_no_error:'',
            bedTypeSel:'',
            bedTypeSelError:'',
            
            amenityselArray:[],
            roomsList:[],
            cottagesList:[],
            bedTypes:[],
            amenitieslist:[],
            amenityselArray:[],


        });
                

        
        this.listRooms();
        this.listBedTypes();
        this.listCottages();
             


     }).catch((error)=>{

        console.log(error);
        

        this.setState({

            hotel_id_error:error.response.data.errors.hotel_id,
            room_no_error:error.response.data.errors.room_no,
            bedTypeSelError:error.response.data.errors.bedTypeSel,
    
        });


 });
}






  render() {


    let cottagesList = this.state.cottagesList.map((item, index)=>{
       
        

        return (
            
            <option value={item.id}>{item.name}</option>

    
        );

    });

    let bedTypes = this.state.bedTypes.map((item, index)=>{
       
        

        return (
            
            <option value={item.id}>{item.bed_type_desc}</option>

    
        );

    });

    let amenitislist = this.state.amenitieslist.map((item, index)=>{

        
    
      
        return (
    
    <div class="col-md-3">
            <div class="form-check">
                <input class="form-check-input"   value={item.id} type="checkbox"  id="amenities" name="amenities_sel[]" onChange={this.chandleCheck} />
                <label class="form-check-label" for="flexCheckDefault" >
                { item.amenity_name }
                </label>
            </div>
    </div>
        );
    
    });




    let j=0;

     let roomsList = this.state.roomsList.map((item, index)=>{
       
        let stringv = ""; 


        stringv = item.amenities.map((amt,i)=>{


                    return(

                        <p>{amt.amenity_name}</p>

                    );
            
            

        });



        return (
            <tr>

                 <td>{ j=j+1 }</td>
                <td>{ item.hotel_name}</td>
                <td>{ item.room_no}</td>
                <td>{ item.bed_type_name}</td>
                <td>{stringv}</td>

                <th><Link to={`/edit-room/${item.id}`} class="btn btn-warning" > Edit </Link></th>
                <th><button type="button" class="btn btn-danger" onClick={()=>this.deleteRoom(item.id)}> Delete </button></th>




                


                

                

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
         <h5>Add Room</h5>

            <form method="POST" action="" onSubmit={this.formSubmit}>
                
                <div class="row">
                    <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Select Cottage / Complex <span class="mandatory">*</span></label>
                            <select class="form-select" name="category" onChange={this.getAmenities}>
                                <option value="">--Select Category--</option>
                                { cottagesList }
                            
                            </select>
                        <span class="err text-danger">{this.state.hotel_id_error}</span>
                    </div>
                </div>
                
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Room Number <span class="mandatory">*</span></label>
                            <input type="text" class="form-control" id=" " placeholder="" name="" onChange={this.handleRoomChange} value={this.state.room_no}/>
                            <span class="err text-danger">{this.state.room_no_error}</span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 mt-3">
                            <label for=" " class="form-label">Bed Type <span class="mandatory">*</span></label>
                            <select class="form-select" name="category" onChange={(e)=>{this.setState({bedTypeSel:e.target.value})}}>
                                <option value="">--Select --</option>
                                { bedTypes }
                            
                            </select>
                        <span class="err text-danger">{this.state.bedTypeSelError}</span>
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

            

            <div class="row">
                <div class="col-md-12">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr className='table-danger'>
                                <th>Sno</th>
                                <th>Name of cottage / Complex</th>
                                <th>Room no</th>
                                <th>Bed Type</th>
                                <th>Amenities</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                         {roomsList}
                        </tbody>
                    </table>
                </div>
            </div>
            </form>
            <p></p>

            <div>
        
        </div>
          </div>
          <ToastContainer />
        <Footer/>
   </div>
    )
  }
}

export default AddRoom