import React, { Component } from 'react';
import Header from '../../../src/common/header';
import Footer from '../../../src/common/footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


class EditRoom extends Component {



    constructor() {
        super();

        const pathname = window.location.pathname;
        const room_id = pathname.substring(pathname.lastIndexOf('/') + 1);
        this.getRoomDetails(room_id);



        this.state = {

            roomList: [],
            cottagesList: [],
            bedTypes: [],
            amenitieslist: [],
            hotel_name: '',
            bed_type_name: '',
            room_no: '',
            hotel_id: '',
            bed_type_id: '',
            amenitislist: [],
            selAmenities: [],
            bedTypeSel: '',
            room_id: room_id,
            amenityselArray: [],
            amenities_sel:[],
            bed_type_id:'',
            hotel_name_error:'',
            room_no_error:'',
            bed_type_id_error:''




        }



    }



    getRoomDetails = (room_id) => {


        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        const data = {
            token: localStorage.getItem("token"),
            room_id: room_id,


        }

        axios.post('/get-room', data, config).then((response) => {

// alert(response.data.roomDetails[0].hotel_id);
            this.setState({
                roomList: response.data.roomDetails,
                hotel_name: response.data.roomDetails[0].hotel_name,
                bed_type_name: response.data.roomDetails[0].bed_type_name,
                room_no: response.data.roomDetails[0].room_no,
                hotel_id: response.data.roomDetails[0].hotel_id,
                bed_type_id: response.data.roomDetails[0].bed_type_id,
                selAmenities: response.data.roomDetails[0].amenities,

            });

            response.data.roomDetails[0].amenities.map((item2, index2)=>{

                this.state.amenityselArray.push(item2.amenity_id);
            });

            this.getAmeniteis(response.data.roomDetails[0].hotel_id);




        }).catch((error) => {
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
    componentDidMount(room_id) {
        this.listCottages();
        this.listBedTypes();

        //this.getAmeniteis();

    }

    getAmeniteis = (hotel_id) => {
        

        this.setState({
            loaderClass: 'loading',
        });



        const data = {
            token: localStorage.getItem("token"),
            hotel_id: hotel_id,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        axios.post('/get-single-cottage-details', data, config).then((response) => {


            this.setState({

                amenitieslist: response.data.selectedAmenities,
                loaderClass:''



            });



        }).catch((error) => {
            alert(error);



        });

    }





    listCottages = () => {
        this.setState({
            loaderClass: 'loading',
        });
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        const data = {
            token: localStorage.getItem("token"),
            hotel_type_id: 500,
        }

        axios.post('/list-cottage', data, config).then((response) => {

            console.log(response.data.cottagesList);
            this.setState({

                cottagesList: response.data.cottagesList,



            });



        }).catch((error) => {
            alert(error);

            console.log(error);

        });


        this.setState({
            loaderClass: '',
        });



    }


    listBedTypes = () => {

        this.setState({
            loaderClass: 'loading',
        });
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        const data = {
            token: localStorage.getItem("token"),
            hotel_type_id: 500,
        }

        axios.post('/get-bed-types', data, config).then((response) => {



            this.setState({

                bedTypes: response.data.bedTypesData,



            });



        }).catch((error) => {
            alert(error);

            console.log(error);

        });

    }

    selectChange=(e)=>{

        this.setState({
            hotel_id:e.target.value
        })


        // alert(e.target.value);


            this.getAmeniteis(e.target.value);
        console.log(this.state.hotel_id)

    }



   

    formSubmit = (e) => {

        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        

        const data = new FormData();

        for (let i = 0; i < this.state.amenityselArray.length; i++) {
            
            data.append("amenities_sel[]", this.state.amenityselArray[i]);
        }

        




        data.append('token', localStorage.getItem("token"));
        data.append('hotel_id', this.state.hotel_id);
        data.append('bed_type_id', this.state.bed_type_id);
        data.append('room_no', this.state.room_no);
        data.append('room_id', this.state.room_id);







        axios.post('/update-room', data, config).then((response) => {

            console.log(response.data);


            if (response.data.status_code == '200') {
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
                    room_no_error:'',
                    bed_type_id_error:''
                })

            } else {
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




        }).catch((error) => {

            console.log(error.response.data.errors[0].room_no);
            this.setState({

                hotel_name_error:error.response.data.errors.hotel_id,
                room_no_error:error.response.data.errors[0].room_no,
                bed_type_id_error:error.response.data.errors.bed_type_id,


                
    
            });

        });
    }


    chandleCheck = (event) => {

    
   
        if (event.target.checked) {
            
            this.state.amenityselArray.push(event.target.value);
        } else {
            
        //   var myIndex = this.state.amenityselArray.indexOf(event.target.value);
        //   if (myIndex !== -2) {
        //     this.state.amenityselArray.splice(myIndex, 1);
        //   }



        for (let i = 0; i < this.state.amenityselArray.length; i++) {
            
            if(this.state.amenityselArray[i] == event.target.value){

                var myIndex=i;
            }

        }

        this.state.amenityselArray.splice(myIndex, 1);



          
        }


        console.log(this.state.amenityselArray);
    
        
        this.setState({
            amenities_sel:this.state.amenityselArray
        });
       
      










    };









    render() {


        let cottagesList = this.state.cottagesList.map((item, index) => {


            var selected = '';



            if (item.id == this.state.hotel_id) {
                selected = 'selected';


            }



            return (

                <option value={item.id}>{item.name}</option>


            );

        });




        let bedTypes = this.state.bedTypes.map((item, index) => {



            return (

                <option value={item.id}>{item.bed_type_desc}</option>


            );

        });


        let amenitislist2 = this.state.selAmenities.map((item, index) => {




            return (

                <p>{item.amenity_name}</p>
            );

        });

        let amenitislist = this.state.amenitieslist.map((item, index) => {

            var checked = '';

            this.state.selAmenities.map((item2, index2) => {

                if (item2.amenity_id === item.id) {
                    checked = 'true';


                }
            });


            return (

                <div class="col-md-3">
                    <div class="form-check">
                        <input class="form-check-input"  defaultChecked={checked} type="checkbox" value={item.id} id="amenities" name="amenities_sel[]" onChange={this.chandleCheck} />
                        <label class="form-check-label" for="flexCheckDefault" >
                            {item.amenity_name}
                        </label>
                    </div>
                </div>
            );

        });




        return (
            <div>
                <Header />

                <div>
            <div class={this.state.loaderClass}>
    
                <div style={ this.state.loaderStyle } ></div>
    
            </div>
        </div>

                <div class='container'>
                    <br />
                    <h5>Edit Room</h5>

                    <form method="POST" action="" onSubmit={this.formSubmit}>

                        <div class="row">
                            <div class="col-md-3">
                                <div class="mb-3 mt-3">
                                    <label for=" " class="form-label">Select Cottage / Complex <span class="mandatory">*</span></label>
                                    <select class="form-select" name="hotel_id" value={this.state.hotel_id} onChange={this.selectChange}>
                                        <option value="">--Select Category--</option>
                                        {cottagesList}

                                    </select>
                                    <span class="err text-danger">{ this.state.hotel_name_error }</span>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="mb-3 mt-3">
                                    <label for=" " class="form-label">Room Number <span class="mandatory">*</span></label>
                                    <input type="hidden" class="form-control" id=" " name="test_room_no" placeholder="" value={this.state.room_no}  />

                                    <input type="text" class="form-control" id=" " name="room_no" placeholder="" value={this.state.room_no} onChange={(e) => { this.setState({ room_no: e.target.value }) }} />
                                    <span class="err text-danger">{this.state.room_no_error}</span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="mb-3 mt-3">
                                    <label for=" " class="form-label">Bed Type <span class="mandatory">*</span></label>
                                    <select class="form-select" name="bed_type_id" value={this.state.bed_type_id} onChange={(e) => { this.setState({ bed_type_id: e.target.value }) }}>
                                        <option value="">--Select --</option>
                                        {bedTypes}

                                    </select>
                                    <span class="err text-danger">{this.state.bed_type_id_error}</span>
                                </div>
                            </div>
                        </div>



                        <h6>Available Amenities:</h6><br />
                        <div class="row">
                            {amenitislist}



                        </div>

                        <div className='row'>
                            <div class="col-md-2" >
                                <button type="submit" class="btn btn-danger mt_42">Update</button>
                            </div>
                        </div>


                    </form>
                    <p></p>

                    <div>

                    </div>
                </div>
                <ToastContainer />
                <Footer />
            </div>
        );
    }
}

export default EditRoom;