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
      roomsList:[],
      hotel_name:[],
      roomcount:0,
      bed_error:'',
      start_date_error:'',
      

      



    }

  }

  componentDidMount() {
    this.getAmeniteis();
    this.listBedTypes();
  }



  stringToTimestamp(s) {
    var t = s.match(/[\d\w]+/g);
    var months = {jan:'01',feb:'02',mar:'03',apr:'04',may:'05',jun:'06',
                  jul:'07',aug:'08',sep:'09',oct:'10',nov:'11',dec:'12'};
    function pad(n){return (n<10?'0':'') + +n;}
    var hrs = t[4] % 12;
    hrs += /pm$/i.test(t[6])? 12 : 0;
  
    return t[3] + '-' + months[t[2].toLowerCase()] + '-' + pad(t[1]) + ' ' +
           pad(hrs) + ':' + pad(t[5]);
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

    

    var s_date = this.state.start_date;

    if(s_date == ''){
          var my_start_date = this.state.start_date;
          var  s_time='';


    }
    else{

      var date1 = this.state.end_date.toISOString();
      var my_start_date = date1.substring(0, 10);
        var  s_time=this.state.end_date.toLocaleTimeString('it-IT');

    }



    var e_date = this.state.start_date;

    if(e_date == ''){

      var my_end_date = this.state.start_date;
      var  e_time='';


    }
    else{

         var date2 = this.state.end_date.toISOString();
      var my_end_date = date2.substring(0, 10);
        var  e_time=this.state.end_date.toLocaleTimeString('it-IT');


    }



    data.append('bedtype', this.state.bedTypeSel);
    data.append('start_date', my_start_date +' '+s_time);
    data.append('end_date', my_end_date +' '+e_time);




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

    axios.post('/search-room',data,config).then((response)=>{


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

                console.log();

                this.setState({

                  roomsList:response.data.RoomsList,
                  roomcount: response.data.roomscount,


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




    }).catch((error)=>{


        console.log();



        this.setState({

          bed_error:error.response.data.errors.bedtype,
          check_error:error.response.data.errors.accomdation,
          start_date_error:error.response.data.errors.start_date,
         

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

    let roomsList = this.state.roomsList.map((item, index)=>{
       let i=0;
      

      return (
          <tr>


              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>{item.count}</td>
             

             
              
          </tr>

  
      );

  });













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




    let rmlist = this.state.roomsList.map((item, index)=>{
      return (

  <div class="col-md-3">
          <div class="form-check">
              {/* <input className="form-check-input"   defaultChecked={this.state.checked} type="checkbox"  value={item.id} id="amenities" name="amenities_sel[]" onChange={this.chandleCheck}/> */}
              <label class="form-check-label" for="flexCheckDefault" >
              { item }
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
                   
 
<DateRangePicker  
      format="yyyy-MM-dd HH:mm:ss"
      defaultCalendarValue={[this.state.start_date, this.state.end_date]}    onChange={this.hangleDateChange}
    /> 
    




                  </div>

                </div>

                <span class="err text-danger">{ this.state.start_date_error }</span>



              




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


                    <select class="form-select" name="bedtype" onChange={(e) => { this.setState({ bedTypeSel: e.target.value }) }}>
                      <option value="">--Select --</option>
                      {bedTypes}

                    </select>
                    <span class="err text-danger">{ this.state.bed_error }</span>

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




            <div class="row">
                <div class="col-md-12 table-responsive">
                    <table class="table table-bordered  table-responsive">
                        <thead>
                            <tr className='table-danger'>
                                <th>Sno</th>
                                <th>Name of Hotel</th>
                                <th>Location</th>
                                <th>No of rooms available</th>
                        

                                <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { roomsList }
                        </tbody>
                    </table>
                </div>
            </div>





          </div>
        </div>



        {/* <Footer /> */}


      </div>

    )
  }
}
