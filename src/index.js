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
        // возвращаеш уже готовый элмент для вывода
        return {
          timeStart: currentLessonSnap.child("timeStart").val()-1,
          timeEnd: currentLessonSnap.child("timeEnd").val()-1,
          week:  currentLessonSnap.child("week").val()
        }
      });
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
    return (
      <ul>
        { lessons.map(lesson => <li>
          <div>
            <p>{this.timeFormat(lesson.timeStart)}</p>
            <p>{this.timeFormat(lesson.timeEnd)}</p>
            <p>{lesson.week} </p>
          </div>          
        </li>) }
      </ul>
    );
  }  

}

class App extends Component {

  refresh(){
    timeTable.child(timeTableKey).on("value", snap=> {

    const currentLesson = snap.child("lessons/"+lessonList[0]);
    
    const subjectKey = currentLesson.child("subject").val();
    const teacherKey = currentLesson.child("teacher").val();

    const currentSubject = snap.child("subjects/"+subjectKey);
    const currentTeacher = snap.child("teachers/"+teacherKey);

    const tplace= currentLesson.child("place").val();
    const tsubject = currentSubject.child("name").val();
    const tteacher = currentTeacher.child("name").val();
    const ttimeStart = currentLesson.child("timeStart").val()-1;
    const timeEnd = currentLesson.child("timeEnd").val()-1;
    const tweek = currentLesson.child("week").val();
    
  });

  }

  render() {   
    console.log(this.tweek)
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


