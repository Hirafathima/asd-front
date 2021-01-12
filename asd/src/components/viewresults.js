import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect,Link} from "react-router-dom";
import '../App.css';

const Viewresults=(props)=>{
    let history = useHistory();

  console.log(props);
  const username = props.match.params.adminid;

    function uploadFile(e){
        e.preventDefault();

        
        const result = document.querySelector('input[type="file"]').files[0];
          const  year=document.getElementById('year').value;
          const  semester=document.getElementById('semester').value;
      
          fetch('http://student-info-backend.herokuapp.com/admin/${username}/results',{
            
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
        },
        body:JSON.stringify({
            year: year,
            sem:semester,
            resultdata: result
      

          })
        }).then(r=>{console.log(r)})
        .catch(err=>console.log(err));
          
        
    }
    return(
    <div>
        
           
            <h3 style={{ paddingLeft:"5vw", paddingTop:"10vh"}}>View Results</h3>
            <div className="col" style={{ paddingTop: "10vh", paddingLeft:"17vw" }}>
              
            <input type="text" class="form-control" id="year" placeholder="Enter Admission Year" style={{ marginBottom: "2vh", width: "50%" }} />
                    <input type="text" class="form-control" id="semester" placeholder="Enter Semester" style={{ marginBottom: "2vh", width: "50%" }} />
                    <label for="myfile">Upload the marksheet</label>
                    <input type="file" id="myfile" name="myfile"></input>
                    <button type="button" class="btn btn-dark" onClick={(e) => uploadFile(e)} style={{ float: "right", marginRight: "23vw" }}>Upload</button>


                </div>
            {/* <button type="submit">register</button> */}

    </div>
    );
}
export default withRouter(Viewresults);