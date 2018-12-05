import React from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';

export default class LoginPage extends React.Component{

    constructor(props){
        super(props);

        this.state={
            email: '',
            password: '',
            
        };
    }

    onEmailChange= (e) => {
        const email= e.target.value;
        this.setState(() => ({email}));
    };

    onPasswordChange= (e) => {
        const password= e.target.value;
        this.setState(() => ({password}));
    }

    logIn= () => {
        const auth= firebase.auth();
        const promise= auth.signInWithEmailAndPassword(this.state.email,this.state.password);
        promise.catch( e => console.log(e.message));

    }

    logOut= () => {
        firebase.auth().signOut();
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged( firebaseUser => {
                
                    if(firebaseUser){
                    console.log('Authorized')
                    console.log(firebaseUser);   
                    if(!firebaseUser.isEmailVerified) 
                    {
                        firebaseUser.sendEmailVerification();
                    } 
                    
                        this.props.history.push("/adminpage");
                
                        
                   
                        
                   
                }else {
                    console.log('Unauthorized/ logout');
                }
        });
    }

    render(){
        return(
            <div>
                <input type="email" placeholder="Email" onChange={this.onEmailChange}/>
                <input type="password" placeholder="Password" onChange={this.onPasswordChange}/>

                <button onClick={this.logIn} >Log In</button>
                

            </div>
        )
    }
}