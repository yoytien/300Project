import React from 'react';
import * as firebase from 'firebase';

export default class LecturerPage extends React.Component{
 
    constructor(props){
        super(props);

        this.state={
            speed: 10
        };
    }

    //always listen any changes
    componentDidMount(){
        const rootRef= firebase.database().ref().child('react');
        const speedRef= rootRef.child('speed');
        speedRef.on('value', snap => {
            this.setState({
                speed: snap.val()
            });
        });
    }

    render(){
        return(
            <div>
                Lecturer page content
                <h1>{this.state.speed}</h1>
            </div>
        )
    }
}