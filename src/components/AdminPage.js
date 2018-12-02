import React from 'react';
import * as firebase from 'firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import {NavLink} from 'react-router-dom';



export default class AdminHome extends React.Component{


    constructor(props){
        super(props);

        this.state={
            Studentid: '',
            coursecode: '',
            Rcourse: '',
            Rdate: '',
            Rtime: '',
            a: '',
            name: '',
            matric1: '',
            year: '',

        };
    }
    onStudentidChange= (e) => {
        const Studentid= e.target.value;
        this.setState(() => ({Studentid}));
    };

    onCourseCodeChange= (e) => {
        const coursecode= e.target.value;
        this.setState(() => ({coursecode}));
    };

    

   btnClick=()=>{
    const matric = Studentid.value;
    const course2 = coursecode.value;     
    var ref = firebase.database().ref("Student");
    ref.orderByChild("/MatricNo").on("child_added", function(snapshot) {
     //console.log(snapshot.key);
     const a = snapshot.key; 
    var name= snapshot.child("Name").val();
    var year=snapshot.child("Year").val();
    var matric1 = snapshot.child("MatricNo").val();
    var cs= snapshot.child("CourseTaken");
    console.log(cs);
   
    if(matric== matric1){
        
    var id = a;
    }
    console.log(id);
    firebase.database().ref("Student/"+id+"/CourseTaken/"+course2).set("Active");
});


    };


    
    search= () =>{
        const matric = Studentid.value;     
        var ref = firebase.database().ref("Student");
        ref.orderByChild("/MatricNo").on("child_added", function(snapshot) {
         //console.log(snapshot.key);
         const a = snapshot.key; 
        var name= snapshot.child("Name").val();
        var year=snapshot.child("Year").val();
        var matric1 = snapshot.child("MatricNo").val();
        
       
        
        if(matric== matric1){
            
        document.getElementById('StudentINFO').innerHTML = 'Name:'+ name +'</br>'+'Matric:'+ matric1 +'</br>'+'Year:'+ year +'</br>';
        }else
        {
            document.getElementById('StudentINFO').innerHTML = 'Student ' + matric +' does not Exits';
        }
    
    });
        };    
          
   
    render(){
        return(
           
           
            <Tabs>
             
             <TabList>
             <Tab>Home</Tab>
             <Tab>Student</Tab>
             <Tab>Report</Tab>
             </TabList>  
            <TabPanel>
                <h2>About</h2>
                <p>Smart Attendance System is a idea to improve the current attendance system using QR code technology
                    This system contain Web page for lecturer and Android application for student.
                    This is the Adminstrater page. to manage the student account and lecturer account.
                </p>

            </TabPanel>
            <TabPanel>
                
                <h2>View Student Info</h2>
                <p> 
                    Student ID: <input id="Studentid" onChange={this.onStudentidChange}></input>
               </p>
                <button onClick={this.search}>Search</button>

               <div id="StudentINFO"></div>

                <h3>Course register</h3>

               
               <p>
                    Course to add: <input id="coursecode"></input> 
                </p>

                <button onClick = {this.btnClick}>submit</button>

            </TabPanel>

            <TabPanel>
                Generate Report
               <p> Course: <input id ="Rcourse"></input></p>
               <button onClick={this.Greport}>Generate Report</button>



                
            </TabPanel>

        </Tabs>
         
                      
                

            
        )
    }
}

   
