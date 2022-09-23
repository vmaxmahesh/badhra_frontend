import React, { Component } from 'react'
import '../css/footer.css';
class footer extends Component {
  state = {
    
    loaderStyle : {
    position: 'absolute',
    textAlign:'center',
      color:'#000',
       top:'70px'
  }
  }
  render() {
    return (
      <div>
        <div class="newfoot myfooter">
    
    <div class="footer_div">
        
    <div class="float-data">© Copyright 2022. Sree Seetha Ramachandra Swamy Vaari Devasthanam</div>
    
    <div class="float-data2">స్వామి వారి సేవలో - <a href="http://vmaxindia.com/" target="_blank">
  <img src={ require('../../src/images/vmax1.png') }    border="0" align="absmiddle" />
  </a>
    
    </div>



    
    </div>
    
    
    
    </div>
      </div>
    )
  }
}

export default footer