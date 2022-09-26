import React, { Component } from 'react'
import Header from '../../common/header';
import Footer from '../../common/footer';
import '../../css/mystyle.css';
import { parseISO, format } from 'date-fns';

import '../../css/daterangepicker.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { DatePicker } from 'rsuite';


import { DateRangePicker } from 'rsuite';

const current = new Date();
const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


export default class AddAccommodation extends Component {










  constructor() {
    super();



    this.state = {

      amenityselArray: [],
      amenitieslist: [],
      cottagesList: [],
      cottageAmenitisList: [],
      selAmenities: [],
      bedTypes: [],
      amenities_sel: [],
      amenityselArray: [],
      bedTypeSel: '',
      start_date: '',
      end_date: '',

      

      



    }

  }

  componentDidMount() {
    this.getAmeniteis();
    this.listBedTypes();
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
      amenities_sel: this.state.amenityselArray
    });


  };

  getDateTime(date) {
    var now     = date;
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}







  formSubmit = (e) => {
    e.preventDefault();


    this.setState({
      loaderClass: 'loading',
    })

    const data = new FormData();

    for (let i = 0; i < this.state.amenities_sel.length; i++) {
      data.append("amenity_sel[]", this.state.amenities_sel[i]);
    }



    data.append('bedTypeSel', this.state.bedTypeSel);
    data.append('start_date', this.state.start_date);
    data.append('end_date', this.state.end_date);

    console.log(this.state.start_date);



    // data.append('type', 1); 

    // data.append('token',localStorage.getItem("token"));
    // data.append('name', this.state.hotel_name,);
    // data.append('location',this.state.location,);
    // data.append('latitude',this.state.latitude,);
    // data.append('langitude',this.state.langitude);
    // data.append('bedrooms_ac',this.state.ac_rooms);
    // data.append('bedrooms_nonac',this.state.non_ac_rooms);
    // data.append('no_pax',this.state.no_pax);
    // data.append('fare_per_day',this.state.per_day_fare);
    // data.append('is_gst_applicable',this.state.is_gst_applicable);
    // data.append('gst_percent',this.state.gst_percent);
    // data.append('is_gst_applicable',this.state.is_gst_applicable);


    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data'

      }
    }

    // axios.post('/create-cottage',data,config).then((response)=>{


    //     if(response.data.status_code == '200'){


    //         toast.success(response.data.message, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,


    //             });

    //             this.setState({

    //                 hotel_name:'',
    //                 location:'',
    //                 latitude:'',
    //                 langitude:'',
    //                 non_ac_rooms:'',
    //                 ac_rooms:'',
    //                 no_pax:'',
    //                 per_day_fare:'',
    //                 gst_percent:'',
    //                 is_gst_applicable:'',
    //                 amenities_sel:[],
    //                 hotel_name_error:'',
    //                 ac_rooms_error:'',
    //                 non_ac_rooms_error:'',
    //                 no_pax_error:'',
    //                 per_day_fare_error:'',
    //                 is_gst_applicable_error:'',
    //                 gst_percent_error:'',
    //                 amenityselArray:[],
    //                 image_error:'',


    //                 amenityselArray:[],
    //                 // amenitieslist:[],
    //                 total:'',
    //                 photosSelected:[],
    //                 photos:[],
    //                 imagesArray:'',
    //                 image:[]






    //             })


    //             this.listCottages();



    //             this.unCheck();












    //     }else{

    //         toast.error(response.data.message, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,


    //             });

    //     }




    // }).catch((error)=>{


    //     console.log(error);



    //     this.setState({

    //         hotel_name_error:error.response.data.errors.name,
    //         ac_rooms_error:error.response.data.errors.bedrooms_ac,
    //         non_ac_rooms_error:error.response.data.errors.bedrooms_nonac,
    //         no_pax_error:error.response.data.errors.no_pax,
    //         per_day_fare_error:error.response.data.errors.fare_per_day,
    //         is_gst_applicable_error:error.response.data.errors.is_gst_applicable,
    //         gst_percent_error:error.response.data.errors.gst_percent,
    //         image_error:error.response.data.errors.images,

    //     });

    //     toast.error(error.response.data.message, {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,


    //         });

    // });

    // this.listCottages();


  }



   checkZero(data){
    if(data.length == 1){
      data = "0" + data;
    }
    return data;
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

   formatDate(date) {
    return (
      [
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join('/') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  


  hangleDateChange = (event) => {


    // const st=event[0];
    // const et=event[1];
// alert(event[0]);


  


    this.setState({
      start_date:event[0],
      end_date:event[1],

    })

    // console.log(this.state.start_date);




  }


  getAmeniteis = () => {
    this.setState({
      loaderClass: 'loading',
    });

    const data = {
      token: localStorage.getItem("token"),
    }

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    axios.post('/get-aminety', data, config).then((response) => {







      this.setState({

        amenitieslist: response.data.amenities,
        loaderClass: '',


      });



    }).catch((error) => {
      alert(error);

      console.log(error);

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





  render() {



    let bedTypes = this.state.bedTypes.map((item, index) => {



      return (

        <option value={item.id}>{item.bed_type_desc}</option>


      );

    });



    let amenitislist = this.state.amenitieslist.map((item, index) => {
      return (

        <div class="col-md-3">
          <div class="form-check">
            <input className="form-check-input" defaultChecked={this.state.checked} type="checkbox" value={item.id} id="amenities" name="amenities_sel[]" onChange={this.chandleCheck} />
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


        <div class="">
          <div class="container">

            <h5 class="mt-4">Book Accommodation</h5>

            {/* <form method="post" action=""> */}

            <form method="POST" action="" id="formid" enctype="multipart/form-data" onSubmit={this.formSubmit}>


              <div class="row">


                {/* <div className="col-md-2">
            <div className="mb-3 mt-3">
                    <label for=" " className="form-label">Check Out date</label>
                    <div className="mydt pt-2 pb-2"  ><input name="checkout_date" type="date"/></div>
               </div>
        </div> */}







                <div className="col-md-12">
                  <div className="mb-3 mt-3">
                    <label for=" " className="form-label">Check In And Checkout Selection</label>
                    {/* <DateRangePicker placeholder="Select Date Range"
                      name="checkoutdates" defaultValue={[this.state.start_date, ]}  />

 */}


<DateRangePicker
      format="yyyy-MM-dd HH:mm:ss"
      defaultCalendarValue={[this.state.start_date, this.state.end_date]}   onChange={this.hangleDateChange}
    />


                  </div>
                </div>


              




                <div className="col-md-2">
                  <div className="mb-3 mt-3">
                    <label for=" " className="form-label">No of Rooms</label>
                    <div className="mydt pt-2 pb-2" >1</div>
                  </div>

                </div>



                {/* <div className="col-md-2">
            <div className="mb-3 mt-3">
                    <label for=" " className="form-label">Check Out time</label>
                    <div className="mydt pt-2 pb-2"  ><input name="checkout_date" type="time"/></div>
               </div>
        </div> */}









                <h6>Available Amenities:</h6><br />
                <div class="row">
                  {amenitislist}



                </div>
              </div>
              <div className="row">


                {/* <div className="col-md-2">
              <div className="mb-3 mt-3">
                    <label for=" " className="form-label">Room Type</label>
                    <select  className="form-select" name="room_type" id="room_type" required="required">
                        <option value="">-Select-</option>
                        @foreach($room_types as $rt)
                        {/* <option value="{{$rt->room_type_id}}" @if($room_type_sel == $rt->room_type_id) selected @endif >{{$rt->room_type_desc}}</option> */}
                {/* @endforeach */}
                {/* </select> */}
                {/* </div> */}
                {/* </div> */}




                <div className="col-md-2">
                  <div className="mb-3 mt-3">
                    <label for=" " className="form-label">Bed Type</label>


                    <select class="form-select" name="category" onChange={(e) => { this.setState({ bedTypeSel: e.target.value }) }}>
                      <option value="">--Select --</option>
                      {bedTypes}

                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3 mt-3">
                    <label for=" " className="form-label">No of Persons Allowed</label>
                    {/* <!--<select  className="form-select" name="no_of_adults" id="no_of_adults"></select>--> */}
                    <input type="text" id="no_of_adults" className="form-control" value="{{ $accupancy_adult_details[0]->adults_description }}" disabled />
                  </div>
                </div>

                <div className='col-md-2 submitbtn' >
                  <input type="submit" class="btn btn-danger " name="search" value="SEARCH" />
                </div>
              </div>
            </form>





          </div>
        </div>



        <Footer />


      </div>

    )
  }
}
