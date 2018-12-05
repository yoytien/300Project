import React,{Component} from 'react';
import * as firebase from 'firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import {LineChart} from 'react-easy-chart';






export default class AdminPage extends React.Component{


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
   

          
    
    stu=()=>{
        document.getElementById('Studentopt').innerHTML= " <option value='' disabled selected>Select Student</option> ";
        var ref = firebase.database().ref("Students");
        ref.orderByChild("MatricNo").on("child_added", function(snapshot) {
         //console.log(snapshot.key);
        
        
        var matric1 = snapshot.child("MatricNo").val();
        var name1 = snapshot.child("Name").val();

        document.getElementById('Studentopt').innerHTML +="<option value='" + matric1 +"'>"+ matric1 +" "+ name1 +"</option>"; 
    
    });
    }

    stu2=()=>{
        document.getElementById('LecturerOpt').innerHTML= " <option value='' disabled selected>Select Lecturer</option> ";
        var ref = firebase.database().ref("Lecturer");
        ref.orderByChild("LecturerID").on("child_added", function(snapshot) {
         //console.log(snapshot.key);
        
        
        var id = snapshot.child("LecturerID").val();
        var name1 = snapshot.child("LecturerName").val();

        document.getElementById('LecturerOpt').innerHTML +="<option value='" + id +"'>"+ id +" "+ name1 +"</option>"; 
        
    });
    }

    ts2=()=>{
        var rootref=firebase.database().ref().child("Class");
        document.getElementById('CourseChoose').innerHTML= " <option value='' disabled selected>Select class</option> ";
   
        rootref.on("value", snap => {
            snap.forEach(function(itemSnapshot) {
              var code= itemSnapshot.key;
              var courseName= rootref.child(code).child("classname");
   
              courseName.once("value")
              .then((snap2)=> {
                  var name= snap2.val();
                  console.log(code+ " " +name);
                 
                 document.getElementById('CourseChoose').innerHTML +="<option value='" + code +"'>"+ code +" "+ name +"</option>"; 
               
               
              });
            });
        });
      
       }
       
    
   btnClick2=()=>{
    const matric = LecturerOpt.value;
    const course2 = CourseChoose.value;     
    var ref = firebase.database().ref("Lecturer");
    ref.orderByChild("/LecturerID").on("child_added", function(snapshot) {
     console.log(snapshot.key);
     const a = snapshot.key; 
    
    var matric1 = snapshot.child("LecturerID").val();
    
    
   
    if(matric== matric1){
        
    var id = a;
    firebase.database().ref("Lecturer/"+id+"/CoursesTeach/"+course2).set("Active");
    
    }
    
    
});


    };

   btnClick=()=>{
    const matric = Studentopt.value;
    const course2 = classoption2.value;     
    var ref = firebase.database().ref("Students");
    ref.orderByChild("/MatricNo").on("child_added", function(snapshot) {
     //console.log(snapshot.key);
     const a = snapshot.key; 
    
    var matric1 = snapshot.child("MatricNo").val();
    var cs= snapshot.child("CoursesTaken");
    console.log(cs);
   
    if(matric== matric1){
        
    var id = a;
    firebase.database().ref("Students/"+id+"/CoursesTaken/"+course2).set("Active");
    
    }
    
    
});


    };


    logOut= () => {
        firebase.auth().signOut();
        this.props.history.push("/");
    };
    
    search= () =>{
        const matric = Studentopt.value;     
        var ref = firebase.database().ref("Students");
        ref.orderByChild("/MatricNo").on("child_added", function(snapshot) {
         //console.log(snapshot.key);
        const a = snapshot.key; 
        var name= snapshot.child("Name").val();
        //var year=snapshot.child("Year").val();
        var matric1 = snapshot.child("MatricNo").val();

        if(matric== matric1){   

        document.getElementById('StudentINFO').innerHTML = 'Name:'+ name +'</br>'+'Matric:'+ matric1 +'</br>';
        document.getElementById('StudentINFO').innerHTML += 'course taken';
        // var lsm=ref.child(a).child('CoursesTaken');
        
        
        
     
    
        }else
        {
            document.getElementById('StudentINFO').innerHTML = 'Student ' + matric +' does not Exits';
        }
    
    });
     };    
          
     Greport=()=>{
        document.getElementById("chart").innerHTML= "<ul>Attendance list";
        var rCourse=classoption3.value;
        var ref = firebase.database().ref().child('Class/'+rCourse+'/ClassSession');
        ref.once('value',snap=>{
            snap.forEach(function(itemSnapshot){
                var classdate=itemSnapshot.key;
                var split = classdate.split("_");
                var date = firebase.database().ref().child("Class").child(rCourse).child("ClassSession").child(split[2]).key;
                var time = firebase.database().ref().child("Class").child(rCourse).child("ClassSession").child(split[3]).key;
               // document.getElementById("chart").innerHTML+="<li>"+classdate+"</li>";
                var dNt= date+ ' '+time;
                 var path=ref.child(classdate+"/Attendance_count");
                 var count=0;
                 var s;
                var attendance = ref.child(classdate+"/Attendance");
                attendance.once("value",snap2=>{
                    snap2.forEach(function(itemSnapshot2){
                      s= itemSnapshot2.val();
                      if(count==0)
                      {document.getElementById("chart").innerHTML+="</br></br><b><li>" +dNt+"</li></b>";}
                         count=count+1;
                         document.getElementById("chart").innerHTML+= "<li>"+s+"</li>"
                        path.set({
                             Attendance_total: count
                        })
                                    
                        
                     }) 
                     if(count==0)
                        {document.getElementById("chart").innerHTML+="</br></br><b><li>"+dNt+"</li></b>";
                            document.getElementById("chart").innerHTML+= "<li>NULL</li>"}

                        document.getElementById("chart").innerHTML+="__________End of list____________";
                      
                     path.set({
                         Attendance_total: count
                     })
                    
                     
                })
                
            
            })
        })
         document.getElementById("chart").innerHTML+= "</ul>";
        // document.getElementById("chart").innerHTML+= "__________End of report____________";
       
        };

    
    ts=()=>{
     var rootref=firebase.database().ref().child("Class");
     document.getElementById('classoption2').innerHTML= " <option value='' disabled selected>Select class</option> ";

     rootref.on("value", snap => {
         snap.forEach(function(itemSnapshot) {
           var code= itemSnapshot.key;
           var courseName= rootref.child(code).child("classname");

           courseName.once("value")
           .then((snap2)=> {
               var name= snap2.val();
               console.log(code+ " " +name);
              
              document.getElementById('classoption2').innerHTML +="<option value='" + code +"'>"+ code +" "+ name +"</option>"; 
            
            
           });
         });
     });
   
    }

    ls= ()=> {
     var rootref=firebase.database().ref().child("Class");
     document.getElementById('classoption3').innerHTML= " <option value='' disabled selected>Select class</option> ";

     rootref.on("value", snap => {
         snap.forEach(function(itemSnapshot) {
           var code= itemSnapshot.key;
           var courseName= rootref.child(code).child("classname");

           courseName.once("value")
           .then((snap2)=> {
               var name= snap2.val();
               console.log(code+ " " +name);
        
              document.getElementById('classoption3').innerHTML +="<option value='" + code +"'>"+ code +" "+ name +"</option>";  
            
           });
         });
     });
   
}
    addCourse=()=>{

        var add_code = document.getElementById("addCourse").value;
        var add_name = document.getElementById("addCourseName").value;
        if(add_code!=""){
        var addCourse=firebase.database().ref().child('Class/'+add_code);
        
        /* Save and update data */
        addCourse.set({
            classname: add_name
        });
    }
    };
    listCourse=()=>{
        var rootref=firebase.database().ref().child("Class");
     document.getElementById('listAll').innerHTML= "  Code   </t>      Course Name </br> ";

     rootref.once("value", snap => {
         snap.forEach(function(itemSnapshot) {
           var code= itemSnapshot.key;
           var courseName= rootref.child(code).child("classname");

           courseName.once("value")
           .then((snap2)=> {
               var name= snap2.val();
               console.log(code+ " " +name);
        
              document.getElementById('listAll').innerHTML +=  code +" "+ name + "</br>";  
            
           });
         });
     });
    }


   
    render(){
        
        return (
               
            <Tabs>
             
             <TabList>
             <Tab>Home</Tab>
             <Tab>Course</Tab>
             <Tab>Lecturer</Tab>
             <Tab>Student</Tab>
             <Tab>Report</Tab>
             <Tab>Log Out</Tab>
             </TabList>  
            <TabPanel>
                <h2>About</h2>
                <p>Smart Attendance System is a idea to improve the current attendance system using QR code technology
                    This system contain Web page for lecturer and Android application for student.
                    This is the Adminstrater page. to manage the student account and lecturer account.
                </p>

            </TabPanel>
            <TabPanel>
            <div>
                <p>Course Management</p>
               <p>Course Code:<input id="addCourse"></input></p> 
               <p>Course Name:<input id="addCourseName"></input></p> 
                <button onClick={this.addCourse}>Add course</button>
                <p> </p>
            </div>
            <button onClick={this.listCourse}>Refresh</button>
            <div id="listAll"></div>
            </TabPanel>
            <TabPanel>
            Assign Course to Lecturer

                < p> 
                    Student ID: <select className="form-control " name="choice"  required="required" id="LecturerOpt"  >
                  <option defaultValue="" disabled selected>Select Lecturer</option>
                  </select>
                  <button onClick={this.stu2}>Refresh</button>
               </p>

                <div className="form-group">
                  <select className="form-control " name="choice"  required="required" id="CourseChoose"  >
                  <option defaultValue="" disabled selected>Select Course</option>
                  
                  </select> <button onClick={this.ts2}>Refresh</button>
                  <p className="help-block text-danger"></p>
                  </div>
                
                <button onClick = {this.btnClick2}>submit</button>


            </TabPanel>

            <TabPanel>
                
                <h2>View Student Info</h2>
                <p> 
                    Student ID: <select className="form-control " name="choice"  required="required" id="Studentopt"  >
                  <option defaultValue="" disabled selected>Select Student</option>
                  </select>
                  <button onClick={this.stu}>Refresh</button>
               </p>
                <button onClick={this.search}>Search</button>

               <div id="StudentINFO"></div>

                <h3>Course register</h3>

               
               {/* <p>
                    Course to add: <input id="coursecode"></input> 
                </p> */}

                <div className="form-group">
                  <select className="form-control " name="choice"  required="required" id="classoption2"  >
                  <option defaultValue="" disabled selected>Select class</option>
                  
                  </select> <button onClick={this.ts}>Refresh</button>
                  <p className="help-block text-danger"></p>
                  </div>
                
                <button onClick = {this.btnClick}>submit</button>

            </TabPanel>

            <TabPanel>
                Generate Report
                <div className="form-group">
                  <select className="form-control " name="choice"  required="required" id="classoption3" >
                  <option defaultValue="" disabled selected>Select class</option>
                  
                  </select> <button onClick={this.ls}>Refresh</button>
                  <p className="help-block text-danger"></p>
                  </div>
               <button onClick={this.Greport}>Generate Report</button>
             <div id="chart">
             
             </div>
            

                
            </TabPanel>
            <TabPanel>
                <p>Are you want to logout?</p>
                <button onClick={this.logOut}>Click for Log out</button>
            </TabPanel>
            
            </Tabs>
            
        );
    }
    
}

   
