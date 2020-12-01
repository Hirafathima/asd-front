import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect, Link} from "react-router-dom";

import {withRouter} from 'react-router';
import { Button } from 'react-bootstrap';
import viewcourse from './viewcourse';

const Notification =(props)=>{
    

    function notify(e){
      const header = document.getElementById('header').value;
      const body = document.getElementById('body').value;
     
      e.preventDefault();

      fetch('http://student-info-backend.herokuapp.com/notification',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
        },
        body:JSON.stringify({
            header:header,
            body:body
      

          })
        }).then(r=>{
          alert("notification is added!!");
          console.log(r);
          
            }).catch(err=>console.log(err));
        }
        
        function view(e){
          
         
          e.preventDefault();
    
          fetch('http://student-info-backend.herokuapp.com/notification',{
            
            headers:{
              
              Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
            }
            }).then(r=>
              
              r.json()
              
              
                ).then(data=>{console.log(data)}).catch(err=>console.log(err));
            }
            
          
      
      
    

   
    
    return (
        
      <div>
        <input type="text" name="header" id="header"/>
        <textarea type="text" name="body" id="body"/>
        <Button onClick={(e)=>{notify(e)}}>notify</Button>

        <Button onClick={(e)=>{view(e)}}>view notifications</Button>
      </div>
    )




}
export default withRouter(Notification);