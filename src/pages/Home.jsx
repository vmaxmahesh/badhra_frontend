import React, { Component } from 'react'

import Header from '../common/header';
import Footer from '../common/footer';
import '../css/homepage.css';
import '../css/mystyle.css';

export default class Home extends Component {
    render() {



        if (localStorage.getItem('token')) {


            var activeId = 'hide';



        }

        else {

            var activeId = '';



        }


        return (
            <div>

                <Header />
                <div class=" ">


                    <div class="innder_main_content">


                        <div class="container">

                            <div class="d-flex justify-content-between align-items-center">
                                <a className='btn btn-danger btnss' id={activeId} href="login"><i class="fas fa-lock"></i> LOGIN</a>
                            </div>


                            <div className="d-flex justify-content-center mt-5">
                                <a href="https://book.bhadrachalamonline.com/book-hotel" className="btnhotelbooking" > BOOK A HOTEL</a>
                            </div>
                            <div class="d-flex justify-content-center mt-5">
                                <a href="https://book.bhadrachalamonline.com/download_tickets" className="btnhotelbooking"> Download Tickets</a>
                            </div>


                        </div>



                        <div>



                        </div>

                    </div>



                </div>

                <Footer />

            </div>

        )
    }
}
