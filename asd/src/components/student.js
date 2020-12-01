import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect, Link } from "react-router-dom";
import Courseregister from './courseregister';
import Course from './course';
import Navhome from './Navhome'
import './student.css'
import './adminprofile.css'
import adminprofile from './images/adminprofile.svg'
const Student = (props) => {
    // const { params: { adminid } } = match;
    let history = useHistory();
    const username = props.match.params.studentid;
    console.log(props);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    //    console.log( JSON.stringify(match));

    useEffect(() => {
        fetch(`http://student-info-backend.herokuapp.com/student/${username}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('user')
            }
        }).then(r => r.json()).then(result => {
            setName(result.name);
            setEmail(result.email);

            console.log(result);
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
            <Navhome navbrand="Student Dashboard" loggedIn="LOGOUT" />
            <Router>
                <div className="row">
                    <div className="col-lg-4">
                        <ul className="navstudent-ul">
                            <li className="navstudent-li"><Link className="a" to={`/student/${username}`}>PROFILE</Link></li>
                            <li className="navstudent-li"><Link className="a" to={`/student/${username}/registercourses`}>COURSE REGISTRATION</Link></li>
                            <li className="navstudent-li"><Link className="a" to={`/student/${username}/certificates`}>UPLOAD CERTIFICATES</Link></li>
                            <li className="navstudent-li"><Link className="a" to={`/student/${username}/results`}>VIEW RESULTS</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <Switch>
                            <Route exact path={`/student/:studentid/certificates`} render={() => (<div>


                                upload certificates

                            </div>
                            )
                            } ></Route>
                            <Route exact path={`/student/:studentid/registercourses`}  ><Courseregister /></Route>
                            <Route exact path={`/student/:studentid/results`} render={() => (<div>


                                results are uploaded here

                            </div>
                            )
                            } ></Route>
                            <Route exact path="/student/:studentid" render={() => (<div>
                                <div className="admin-pro">

<img src={adminprofile} className="pro-img"></img>
<ul className="adminprofile-ul">
<li>Name:{name}</li>
<li>Phone:</li>
<li>Date of birth:</li>
<li>Mail id: {email}</li>
<li>Department:</li>
</ul>


</div>

                                hello {name} this is your dashboard .email:{email}

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

export default withRouter(Student);