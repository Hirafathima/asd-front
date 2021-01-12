import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect, Link} from "react-router-dom";

import {withRouter} from 'react-router';
import { Button } from 'react-bootstrap';
import viewcourse from './viewcourse';

const Notification =(props)=>{
    
  const [notifications, setNotifications] = useState([]);

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
              
              
                ).then(data=>{setNotifications(data.notifications);
                console.log(notifications);
                }).catch(err=>console.log(err));
            }

            
            
          
      
      
    

   
    
    return (
        
      <div style={{paddingTop:"10vh", paddingLeft:"10vw"}}>
        <input type="text" name="header" className="form-control" id="header" placeholder="Enter caption" style={{width:"50%", marginBottom:"5vh"}}/>
        <textarea type="text" name="body" className="form-control" id="body" placeholder="Enter message" style={{width:"50%", marginBottom:"5vh"}}/>
        <button className="btn btn-dark" onClick={(e)=>{notify(e)}} style={{ float: "right", marginRight: "23vw" }}>Publish</button>
        <button className="btn btn-dark" onClick={(e)=>{view(e)}} >View Notifications</button>
        {notifications!==null?notifications.map(x=>{
          return(<div>
        <h3>{x.header}</h3>
          <h6>{x.body}</h6>
        </div>)}):''}
      </div>
    )




}
export default withRouter(Notification);