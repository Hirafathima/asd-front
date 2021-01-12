import React, { useState } from "react";
// import displaycertificate from "./displaycertificate";
import NewWindow from 'react-new-window';


function Certificate(props){

    const studentname=props.studentid;
        const certificateid=props.id;

       
       
        

        function opencertificate(link){
            window.open(link);
        }
        function clicking(event){
            event.preventDefault();
            handleclick();
        }
    function handleclick(){
     
     fetch(`http://localhost:9000/student/${studentname}/viewcertificates/${certificateid}`, {
            
        headers:{
            
          Authorization:'Bearer '+localStorage.getItem('accesstoken')+' '+ localStorage.getItem('username')
        }}).then(res=>res.json()).then(result=>{
           
            opencertificate(result.link);
        } );
    
return;
    
    }
    return <div>
        <h5>Title :{props.title}</h5>
        <h6>Category :{props.category}</h6>
        <p>Points:{props.points}</p>
        <p>Comments:{props.comments}</p>
        {/* <p></p> */}
        <button onClick={clicking}>View Certificate</button>
        {/* <img src={path+props.filepath}></img> */}
        
        
        </div>
}

export default Certificate;