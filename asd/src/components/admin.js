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
    // console.log( JSON.stringify(match));

    function setimage(e) {
        e.preventDefault();

        var data = new FormData();
        const image = document.querySelector('input[type="file"]').files[0];
        data.append('data', image);
        console.log(image)

        fetch(`http://student-info-backend.herokuapp.com/admin/${username}/images`, {
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

            // console.log(result);
        })

            .catch(err => console.log(err));

        //  axios.get('http://student-info-backend.herokuapp.com/admin/'+username).then(r=>{
        //     setName(r.data.name);
        //     setEmail(r.data.email);

        //     // console.log(r);
        //     }).catch(err=>console.log(err));


    });
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
                            <li className="navadmin-li"> <Link className='a' to={`/admin/${username}/viewresults`}>VIEW RESULTS</Link></li>
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
                            <Route exact path="/admin/:adminid" render={() => (
                                <div className="admin-pro">
                                    <img src={src} className="pro-img"/>
                                    <div>
                   <form onSubmit={(e)=>{
                       setimage(e)
                   }} encType="multipart/form-data" >
                       <input type="file" name="image" id="image"/>
                       <button type="submit">set image</button>
                   </form>
               </div>
               <div>
                   
                   
                
               </div>

                                    

                                    <ul className="adminprofile-ul">
                                        <li>Name: {name}</li>
                                        <li>Phone:</li>
                                        <li>Date of birth:</li>
                                        <li>Mail id: {email}</li>
                                        <li>Department:</li>
                                    </ul>


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