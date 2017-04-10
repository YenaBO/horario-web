import React, { Component } from 'react';
import * as firebase from 'firebase';
import ReactDOM from 'react-dom';

var config = {
    apiKey: "AIzaSyBeYSr27_voOElA5UvC1fp9D1y9y246IZg",
    authDomain: "test-firebase-eb0b3.firebaseapp.com",
    databaseURL: "https://test-firebase-eb0b3.firebaseio.com",
    projectId: "test-firebase-eb0b3",
    storageBucket: "test-firebase-eb0b3.appspot.com",
    messagingSenderId: "227801800277"
  };
  firebase.initializeApp(config);

  //any user key
  var userKey = "2uFC4t3G7xS9SVZxOhJrc30k54s2";
  //any time table key 
  var timeTableKey = "-KZXe_C8hopNLfo3l1VO";
  
  var timeTableList =[];
  var lessonList = new Array();
  const users = firebase.database().ref().child("users")
  const timeTable = users.child(userKey+"/timetables_data");
  const lessons = timeTable.child(timeTableKey+"/lessons");

  timeTable.once("value", snap => {
    snap.forEach(listed =>{
      timeTableList.push(listed.key);
    })
  });

  let i=0;
  
  

  lessons.once("value", snap => {
    snap.forEach(listed =>{
      lessonList[i]= listed.key;

      i++;
    })
  });
  lessonList=["-KZvwMWaMgGC0qSBhKcv", "-KZvwYqaUE6vNNzUcW7y", "-KZvyYujGxzAf9R_W44Z"]


  class Place extends Component{

    constructor(){
      super();
      this.state={
        place: ""
      }
    }

    componentDidMount(){
      timeTable.child(timeTableKey).on("value", snap=> {
        const currentLesson = snap.child("lessons/"+lessonList[0]);
        this.setState({
          place: currentLesson.child("place").val()
        })
    });
    }

    render() {
      return <p>{this.state.place}</p> 
    }  

  }

  class Subject extends Component{

    constructor(){
      super();
      this.state={
        subject: ""
      }
    }

    componentDidMount(){
      timeTable.child(timeTableKey).on("value", snap=> {
        const currentLesson = snap.child("lessons/"+lessonList[0]);
        const subjectKey = currentLesson.child("subject").val();
        const currentSubject = snap.child("subjects/"+subjectKey);
        this.setState({
          subject: currentSubject.child("name").val(),
        })
    });
    }

    render() {
      return <p>{this.state.subject}</p> 
    }  

  }


   class Teacher extends Component{

    constructor(){
      super();
      this.state={
        teacher: ""
      }
    }

      componentDidMount(){
      timeTable.child(timeTableKey).on("value", snap=> {
        const currentLesson = snap.child("lessons/"+lessonList[0]);
        const teacherKey = currentLesson.child("teacher").val();
        const currentTeacher = snap.child("teachers/"+teacherKey);
        this.setState({
           teacher: currentTeacher.child("name").val(),
        })
    });
    }

    render() {
      return <p>{this.state.teacher}</p> 
    }  

  }

class Time extends Component{

  constructor(){
    super();
    this.state={
      timeStart: "00:00",
      timeEnd: "00:00",
      week: 0
    }
  }

  componentDidMount(){
    timeTable.child(timeTableKey).on("value", snap=> {
      const currentLesson = snap.child("lessons/"+lessonList[0]);
      this.setState({
        timeStart: currentLesson.child("timeStart").val()-1,
        timeEnd: currentLesson.child("timeEnd").val()-1,
        week:  currentLesson.child("week").val()
      })
  });
  }

  timeFormat(minutes){
      let time = minutes;
      var h = time / 60 ^ 0;
      if (h) {
        var m = time % 60;
        if (m < 10) m = '0' + m;
        time = h + ' ч ' + m + ' м';
        } else {
        time = time + ' м';
      }
      return time;
  }
    
  render() {
    let ts = this.timeFormat(this.state.timeStart);
    let te = this.timeFormat(this.state.timeEnd);
    return (
      <div>
        <p>{ts}</p>
        <p>{te}</p>
        <p>{this.state.week} </p>
      </div>)
  }  

}

class App extends Component {
  render() {   
    return (
      <div className="App">
         <Place/>
        <Subject/>
        <Teacher/>
        <Time/>
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);


