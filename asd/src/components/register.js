 
import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect,Link} from "react-router-dom";
import '../App.css';

const Register =(props)=>{
  console.log(props);
    const [message,setMessage]=useState('');
    function register(e){
        e.preventDefault();

        
          const  username=document.getElementById('username').value;
          const  password=document.getElementById('password').value;
          const  name=document.getElementById('name').value;
          const  department=document.getElementById('department').value;
          const  currentsem=document.getElementById('currentsem').value;
      
          fetch('http://student-info-backend.herokuapp.com/register',{
            
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
        },
        body:JSON.stringify({
            username:username,
            password:password,
            name:name,
            currentsem:currentsem,
            department:department,
            currentuser:props.match.params.adminid
      

          })
        }).then(r=>{
            if(r.status === 500){
              alert("token expired login again to continue");
            return <Redirect to='/' />
              // throw new Error("token exired");
            }
            if(r.status === 401){
              alert("not authenticated to do this action");
              return <Redirect to='/' />
              // throw new Error("not authenticated");
            }
            if(r.status === 403){
              alert("student already registered!!");
              // return <Redirect to='/' />
               throw new Error("cant add existing student");
            }
            
            return r.json().then(res =>{
              console.log(res);
              setMessage(" YOU HAVE REGISTERED A STUDENT SUCCESFULLY");
              alert("registered succesfully");
             
            }).catch(err=>console.log(err));;
          }).then(r=>{console.log(r)}).catch(err=>console.log(err));
          
        
    }
    return(
    <div>
        
            {/* <input type="text" name="name" id="name"/>
            <input type="text" name="email" id="email"/>
            <input type="text" name="username" id="username"/>
            <input type="text" name="password" id="password"/>
            <input type="text" name="currentsem" id="currentsem"/>
            <input type="text" name="department" id="department"/> */}
            <h3 style={{ paddingLeft:"5vw", paddingTop:"10vh"}}>Student Registration</h3>
            <div className="col" style={{ paddingTop: "10vh", paddingLeft:"17vw" }}>
              
            <input type="text" class="form-control" id="name" placeholder="Enter name" style={{ marginBottom: "2vh", width: "50%" }} />
                    <input type="text" class="form-control" id="username" placeholder="Enter username" style={{ marginBottom: "2vh", width: "50%" }} />
                    <input type="password" class="form-control" id="password" placeholder="Enter password" style={{ marginBottom: "2vh", width: "50%" }}></input>
                    <input type="text" class="form-control" id="currentsem" placeholder="Enter current semester" style={{ marginBottom: "2vh", width: "50%" }} />
                    <input type="text" class="form-control" id="department" placeholder="Enter department" style={{ marginBottom: "2vh", width: "50%" }} />
                    <button type="button" class="btn btn-dark" onClick={(e) => register(e)} style={{ float: "right", marginRight: "23vw" }}>Register</button>


                </div>
            {/* <button type="submit">register</button> */}

        
            {message}
    </div>
    );
}
export default withRouter(Register);