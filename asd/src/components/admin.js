import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect, Link } from "react-router-dom";
import Register from './register';
import Viewcourse from './viewcourse';
import Course from './course';
import Viewstudents from './viewstudents';
import Notification from './notifications';
import Navhome from './Navhome';
import Publishresults from './publishresults';
import './navadmin.css'

import adminprofile from './images/adminprofile.svg'
import './adminprofile.css'
const Admin = (props) => {
    // const { params: { adminid } } = match;
    let history = useHistory();
    const username = props.match.params.adminid;
    console.log(props);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [src, setSrc] = useState('');
    const [img, setImage] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [click, setClick] = useState(false);
    const [editClicked, setEditClicked] = useState(false);

    function handleChange(){
        setClick(true);
    }

    function handleClick(){
        setClicked(true);
    }
    // console.log( JSON.stringify(match));
    function changePassword(){
        const  newpass=document.getElementById('new_password').value;
        setClicked(false);


        fetch(`http://student-info-backend.herokuapp.com/`, {
            method: "POST",
            headers: {


                Authorization: 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('user')
            },
            body: JSON.stringify({
                password: newpass
            })

        }).then(r => r.json()).then(path => {
            console.log('Password updated')
            

        }).catch(err => {
            console.log(err)
        });
    }

    
    function setimage(e) {
        e.preventDefault();
        setImage(true)
        setClick(false);
        var data = new FormData();
        const image = document.querySelector('input[type="file"]').files[0];
        data.append('data', image);
        fetch(`http://student-info-backend.herokuapp.com/dp/admin/${username}/images`, {
            method: "POST",
            headers: {


                Authorization: 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('user')
            },
            body: data

        }).then(r => r.json()).then(path => {
            console.log(path)
            setSrc('http://student-info-backend.herokuapp.com/' + path.path)
            

        }).catch(err => {
            console.log(err)
        });
    }

    useEffect(() => {
        fetch(`http://student-info-backend.herokuapp.com/admin/${username}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('user')
            }
        }).then(r => r.json()).then(result => {
            setName(result.name);
            setEmail(result.email);
            setSrc('http://student-info-backend.herokuapp.com/'+result.path)

            // console.log(result);
        })

            .catch(err => console.log(err));

        //  axios.get('http://student-info-backend.herokuapp.com/admin/'+username).then(r=>{
        //     setName(r.data.name);
        //     setEmail(r.data.email);

        //     // console.log(r);
        //     }).catch(err=>console.log(err));


    });

    function editDetails(e){
        e.preventDefault();

        setEditClicked(true); 
    }

    function updateDetails(e){
        e.preventDefault();
        setEditClicked(false);

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const dob = document.getElementById('dob').value;
        const email = document.getElementById('email').value;
        const dept = document.getElementById('dept').value;

        fetch('http://student-info-backend.herokuapp.com/',{
            
            method:"POST",
            headers:{
              'Content-Type':'application/json',
              Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
            },
            body:JSON.stringify({
                name:name,
                phone:phone,
                dob:dob,
                email:email,
                department:dept
          
    
              })
            }).then(r=>{console.log(r)}).catch(err=>console.log(err));
              
            
        }
        

    if (localStorage.getItem('isloggedin')) {
        return (<div>
            <Navhome navbrand="Admin Dashboard" loggedIn="LOGOUT" />

            <Router>
                <div className="row">
                    <div className="col-lg-4">
                        <ul className="navadmin-ul">




                            {/* 
           
            
             */}
                            <li className="navadmin-li"><Link className='a' to={`/admin/${username}`}>PROFILE</Link></li>
                            <li className="navadmin-li"><Link className='a' to={`/admin/${username}/registerstudents`}>REGISTER STUDENTS</Link></li>
                            <li className="navadmin-li"><Link className='a' to={`/admin/${username}/registercourses`}>REGISTER COURSES</Link></li>
                            <li className="navadmin-li"><Link className='a' to={`/admin/${username}/viewcourses`}>VIEW COURSES</Link></li>
                            <li className="navadmin-li"><Link className='a' to={`/admin/${username}/viewstudents`}>VIEW STUDENTS</Link></li>
                            <li className="navadmin-li"><Link className='a' to={`/admin/${username}/results`}>PUBLISH RESULTS</Link></li>
                            <li className="navadmin-li"><Link className='a' to={`/admin/${username}/notification`}>POST NOTIFICATIONS</Link></li>


                        </ul>
                    </div>
                    <div className="col">


                        <Switch>
                            <Route exact path={`/admin/:adminid/registerstudents`}  ><Register /></Route>
                            <Route exact path={`/admin/:adminid/registercourses`}  ><Course /></Route>
                            <Route exact path={`/admin/:adminid/viewcourses`}  ><Viewcourse /></Route>
                            <Route exact path={`/admin/:adminid/viewstudents`}  ><Viewstudents /></Route>
                            <Route exact path={`/admin/:adminid/notification`}  ><Notification /></Route>
                            <Route exact path={`/admin/:adminid/results`}  ><Publishresults /></Route>
                            <Route exact path="/admin/:adminid" render={() => (
                                
                                <div className="admin-pro">
                                    <img src={src} className="pro-img"/>
                                    {(src===null || src===undefined) || click ===true?<div>
                   <form onSubmit={(e)=>{
                       setimage(e)
                   }} encType="multipart/form-data" >
                       <input type="file" name="image" id="image"/>
                       <button type="submit" class="btn btn-dark">Update</button>
                   </form>
               </div>:<div>
               <button onClick={handleChange} class="btn btn-dark">Change Image</button>

                   
                
                   </div>}
                                    
               

                                    

                                    <ul className="adminprofile-ul">
                                    {editClicked===false?<div><li>Name:{name}</li>
<li>Phone:</li>
<li>Date of birth:</li>
<li>Mail id: {email}</li>
<li>Department:</li></div>:<div><li>Name:<input type='text' id='name' defaultValue={name} className='form-control' style={{width:"25%", display:"inline-block"}}></input></li>
<li>Phone:<input type='text' className='form-control' id='phone' style={{width:"25%", display:"inline-block"}}></input></li>
<li>Date of birth:<input type='text' className='form-control' id='dob' style={{width:"25%", display:"inline-block"}}></input></li>
<li>Mail id: <input type='text' defaultValue={email} id='email' className='form-control' style={{width:"25%", display:"inline-block"}}></input></li>
<li>Department:<input type='text' className='form-control' id='dept' style={{width:"25%", display:"inline-block"}}></input></li>
<button type="button" class="btn btn-dark" onClick={(e) => updateDetails(e)} style={{ float: "right", marginRight: "23vw" }}>Update Details</button></div>}

                                    </ul>
                                    <button type="button" class="btn btn-dark" onClick={handleClick} style={{ float: "right", marginRight: "23vw" }}>Change Password</button>
                                    {clicked===true?<div><input type="text" class="form-control" name="new_password" id="new_password" placeholder="Enter New Password" style={{ marginBottom: "2vh", width: "50%" }} />
                                    <input type="text" class="form-control" placeholder="Confirm New Password" style={{ marginBottom: "2vh", width: "50%" }} />

                                    <button type="button" class="btn btn-dark" onClick={(e) => changePassword(e)} style={{ float: "right", marginRight: "23vw" }}>Update Password</button></div>:''}
                                    
<button type="button" class="btn btn-dark" onClick={editDetails} style={{ float: "right", marginRight: "23vw" }}>Edit details</button>


                                </div>
                            )
                            } />



                        </Switch>



                    </div>
                </div>

            </Router>


            {/* <a>register student</a> */}
        </div>
        )
    }
    else {
        return (
            <div>
                <div>you are not logged in</div>
                <Button onClick={() => {
                    history.push("/")
                }}>LOGIN</Button>

            </div>

        );
    }
}

export default withRouter(Admin);