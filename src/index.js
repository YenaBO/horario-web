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

class App extends Component {

   constructor(){
    super();
    this.state={
      lessons: []
    }
  }

  componentDidMount(){
    timeTable.child(timeTableKey).on("value", snap=> {
      // ты сначала выгребаешь в массив все свои уроки в нужном формате
      // lessonList.map применяется к массиву и возвращает новый массив 
      // который состоит из элементов которые возвращает коллбек
      // проще говоря, получаешь новый массив из текущего проводя какую то 
      // операцию над каждым элементом
      // в данном случае из массива своих ключей ты получаешь массив уже готовых для вывода элементов
      const allLessons = lessonList.map(currentLesson => {
        // пороходишься по массиву, для каждого элемента берез его snap
        const currentLessonSnap = snap.child("lessons/" + currentLesson);
            const subjectKey = currentLessonSnap.child("subject").val();
            const teacherKey = currentLessonSnap.child("teacher").val();

            const currentSubject = snap.child("subjects/"+subjectKey);
            const currentTeacher = snap.child("teachers/"+teacherKey);
        // возвращаеш уже готовый элмент для вывода
        return {
          day: currentLessonSnap.child("day").val(),
          place: currentLessonSnap.child("place").val(),
          subject: currentSubject.child("name").val(),
          teacher: currentTeacher.child("name").val(),
          timeStart: currentLessonSnap.child("timeStart").val()-1,
          timeEnd: currentLessonSnap.child("timeEnd").val()-1,
          week:  currentLessonSnap.child("week").val()
        }
      });
      console.log(allLessons)
      // кладешь этот массив в state
      this.setState({
        lessons: allLessons
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
    // а вот тут уже выводишь сам стейт по аналогии с тем что делали выше: 
    // получаешь новый массив react-элементов из массива с данными через мап
    const {lessons} = this.state;
    console.log(lessons.length)
    var x =12, y=50;
    var minTime=999, maxTime=0;
    lessons.map(function(lesson) {
      if(minTime>lesson.timeStart) minTime=lesson.timeStart;
      if(maxTime<lesson.timeEnd) maxTime=lesson.timeEnd;
    });


    console.log("min: " +minTime);
    console.log("max: " +maxTime);
    var scale = maxTime-minTime;
    console.log("scale: " + scale);

    var scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    console.log("Scroll: "+scrollHeight)

    return (
      

      <div style={{
        width: "85vh",
        height: "85vh"
      }}>
      { lessons.map(function(lesson) {
          //выбор недели, которую нужо 
          if (lesson.week ==0 || lesson.week == 1)
          return(
          <div  style={{position: "absolute",
          "margin-left": "100px",
        width: "100px",
        height: String((lesson.timeEnd-lesson.timeStart)*100/scale )+"%",
        top: String((lesson.timeStart-minTime)*100/scale )+"%",
        left: String(x*lesson.day)+"%",
        padding: "2px",
        background: "#fff", 
        border: "3px dashed #312a22",}}>
            <p className="name">{lesson.subject}</p>
            <p>{lesson.place}</p>
            <p>{lesson.teacher}</p>
            <p>{this.timeFormat(lesson.timeStart)}</p>
            <p>{this.timeFormat(lesson.timeEnd)}</p>
            <p>{lesson.day}</p>
            {//<p>{lesson.week}</p>
          }
          </div>          
          )}.bind(this)
        )}
      </div>
      
    );


  }  
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

