import React, { Component } from 'react';
import * as firebase from 'firebase';
import ReactDOM from 'react-dom';
import styles from './material.css';
import * as material from "./material.js";

import Dialog from './dialog.js'

/*var config = {
    apiKey: "AIzaSyA0DlUWE0V9e-6AL0Ta9eaVIf2yrMbyc_k",
    authDomain: "horario-10354.firebaseapp.com",
    databaseURL: "https://horario-10354.firebaseio.com",
    projectId: "horario-10354",
    storageBucket: "horario-10354.appspot.com",
    messagingSenderId: "855280611126"
  };
  firebase.initializeApp(config);*/

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhurJ_xMdJEtOcafHzalB9KvFjyBThqmg",
    authDomain: "horario-5c4c0.firebaseapp.com",
    databaseURL: "https://horario-5c4c0.firebaseio.com",
    projectId: "horario-5c4c0",
    storageBucket: "horario-5c4c0.appspot.com",
    messagingSenderId: "868905265817"
  };
  firebase.initializeApp(config);

  var userKey = "YhTvBZ5eMTPeuhTKZAh9SeCiVGt1";
  var timeTableKey = "-KguZ6-bx-bkMGjutdkJ";
  const weekCycle =1;
  var timeTableList = new Array();
  var lessonList = new Array();
  const users = firebase.database().ref().child("user")
  const timeTable = users.child(userKey+"/timetable_public");
  const lessons = timeTable.child(timeTableKey+"/lessons");
  let i=0;
  
  lessons.once("value", snap => {
    snap.forEach(listed =>{
      lessonList[i]= listed.key;
      i++;
    })
  });
  


class App extends Component {

    constructor(){
        super();
        this.state={
          lessons: [],
          week: 1
        }
      }

    componentDidMount(){
    timeTable.on("value", snap=> {
      const currentTimeTable = snap.child(timeTableKey);
      weekCycle = currentTimeTable.child("weekCycle").val();
      const allLessons = lessonList.map(currentLesson => {
      const currentLessonSnap = currentTimeTable.child("lessons/" + currentLesson);
      const teacherKey = currentLessonSnap.child("teacher").val();
      const currentTeacher = currentTimeTable.child("teachers/"+teacherKey);
      const subjectKey = currentLessonSnap.child("subject").val();
      const currentSubject = currentTimeTable.child("subjects/"+subjectKey);

      return {
        day: currentLessonSnap.child("day").val(),
        subject: currentSubject.child("name").val(),
        subjectColor: currentSubject.child("color").val(),
        place: currentLessonSnap.child("place").val(),
        teacher: currentTeacher.child("name").val(),
        timeStart: currentLessonSnap.child("timeStart").val()-1,
        timeEnd: currentLessonSnap.child("timeEnd").val()-1,
        week:  currentLessonSnap.child("week").val(),
        timeTable: timeTableKey
      }
    });
      this.setState({
        lessons: allLessons,
        week: 1
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

  toColor(num) {
    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = ( (num & 0xFF000000) >>> 24 ) / 255 ;

    return "rgba(" + [r, g, b, a].join(",") + ")";
  }

  

  isColorDark(color) { 
    let brightness = ((0x00FF0000&color) >> 16) * 0.299 + 
    ((0x0000FF00&color) >> 8) * 0.587 + 
    (0x000000FF&color) * 0.114; 
    return brightness < 160; 
  } 
  
  nextWeek = () =>  {
    if(this.state.week<weekCycle){
        this.setState({
          lesson: this.state.lessons,
          week: this.state.week+1,});
      }else {
        this.setState({
          lesson: this.state.lessons,
          week: 1,});
      }
  }

showModalDialog = () => {
            


            console.log("ASDASDASDSADS")
            var dialog = document.querySelector('dialog');

            dialog.showModal();
            dialog.querySelector('.close').addEventListener('click', function () {
                dialog.close();
            });

            dialog.querySelector('.ok').addEventListener('click', function () {
                dialog.close();
            });
           
  } 
 

  render() {
    const {lessons} = this.state;   
    const week = this.state.week;
    var min=9999, max=0;
    
    var timeArr=[];
    var daysName=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday", "Sunday"];
    var days= [0,0,0,0,0,0,0]
    var day=0;
    
    lessons.map(function(lesson){
      if(min>lesson.timeStart) min=lesson.timeStart;
      if(max<lesson.timeEnd) max=lesson.timeEnd;
      if(timeArr.indexOf(lesson.timeEnd)===-1 && (lesson.week===0 || lesson.week ===week))
        timeArr.push(lesson.timeEnd);      
      if(timeArr.indexOf(lesson.timeStart)===-1 && (lesson.week===0 || lesson.week ===week))
            timeArr.push(lesson.timeStart);
      if(days[lesson.day]===0 && (lesson.week===0 || lesson.week ===week)) {
        days[lesson.day]= lesson.day+1;
        day++;
      }
    }.bind(this))
    console.log(day)
    var x=100/day;
    var i=0;
  
    console.log(days)

    while(i<7){
      if(days[i]===0){
        daysName.splice(i,1);
        days.splice(i,1);
      } 
      ++i;
    }
    if(days[days.length-1]==0)     days.splice(days.length-1,1)
      console.log(days)
    var scale=max-min;
    
    
      
      timeArr.sort(function(a, b) {
          if (a > b) return 1;
          if (a < b) return -1;
        })

    for(let i=1; i<timeArr.length; i++){
      if(timeArr[i]-timeArr[i-1]<=15){
        timeArr.splice(i,1)

      }

    }
    i=0;



    return (
      <div>
      <div className="navbar navbar-default">
      
        <div style={{"paddingLeft": "8%","paddingTop":"5px", "width":"45px", "height":"45px"}} >       
             <img src="a.png" style={{"position": "absolute", "width":"35px", "height":"35px"}} onClick={this.nextWeek}/>
            <div style={{"paddingLeft": "13px", "paddingTop": "10px", "width":"100%", "height":"100%", "color": "rgb(128,128,128)"}}>{this.state.week}</div>
        </div>  
          
      </div>
      
      <div className="container-fluid">
        <div className="row">
          
          <dialog className="mdl-dialog">
            <div className="mdl-dialog__content">
<Dialog/>
            </div>
          </dialog>

          <div className="hidden-sm hidden-xs col-md-1 col-lg-1" style={{"height":"87vh",  "display":"inline-block"}}> 
           
          {
             timeArr.map(function(time) {
               
                return(
                  <div>
                    <div className="mdl-list__times" style={{ "position": "absolute",  "top": String(100*(time-min)/scale -2)+"%", "margineTop": "0px"}}> 
                      {this.timeFormat(time)} 

                    </div>
                    <div style={{"position": "absolute", "left":"112px", "top": String(100*(time-min)/scale)+"%", "height":"1px", "width": "90vw", "background": "Lavender"}}></div>  
                  </div>
                  );
              
            }.bind(this))
           }
                

          </div>
          <div className="col-xs-11  col-sm-11 col-md-11 col-lg-11" style={{ "width": "90vw", "height":"87vh"}}>
            <div> 
              {days.map(function(day){
                  return (<div className="mdl-list__days" style={{"position": "absolute",
                            "left": String(x*(days.indexOf(day))+4)+"%",
                            "top": "-20px"}} >            
                           {daysName[++i-1]}
                        </div>)
              }.bind(this))}
            </div>
            { lessons.map(function(lesson) {
              if(lesson.week===0 || lesson.week ===week)
              return(
                      
                          <div id="lesson" style={{
                            "overflow": "hidden",
                            "textOverflow": "ellipsis",
                            "position": "absolute",
                            "left": String(x*days.indexOf(lesson.day+1))+"%",
                            "top": String(100*(lesson.timeStart-min)/scale )+"%",
                            "width": "12%",
                            "color": this.isColorDark(lesson.subjectColor) ? "white" : "black",
                            "height": String(100*(lesson.timeEnd-lesson.timeStart)/scale)+"%",  
                            "background": this.toColor(lesson.subjectColor)
                            }}> 
                            <div style={{"padding": "5px"}}>
                              <li className="mdl-list__lesson_name" style={{"fontWeight": "bold", "listStyleType": "none"}}>{lesson.subject}</li>
                              <div style={{ "color": this.isColorDark(lesson.subjectColor) ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"}}>
                                <li className="mdl-list__lesson_other" style={{"listStyleType": "none"}}>{lesson.place}</li>
                                <li className="mdl-list__lesson_other" style={{"listStyleType": "none"}}>{lesson.teacher}</li>
                              </div>
                            </div>
                          </div>)
          }.bind(this))}
          {/*}<FABButton colored ripple style={{"position": "absolute", "paddingLeft": "90%", "paddingTop":"40%"}} onClick={this.showModalDialog}>
              <Icon name="add" />
          </FABButton>{*/}
            <div style={{"position": "absolute", "paddingLeft": "90%", "paddingTop":"40%"}} onClick={this.showModalDialog}>
              <div className="mdl-button mdl-js-button mdl-button--fab mdl-button--primary show-modal" >
                  <i className="material-icons" >add</i>
              </div>
            </div>
      </div>
        </div>
      </div>
         
      </div>
    );


  }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);


