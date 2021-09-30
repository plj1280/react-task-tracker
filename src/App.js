import Task from './Task'
import {useState, useEffect} from 'react'

function App() {

  const dbURL = "https://u34x82trhl.execute-api.us-east-2.amazonaws.com/Prod/tasks"
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");

  function strToNum(key,val) {
    const num = Number(val)
    return isNaN(num) ? val : num
  }

  const onClickCreateTask = () => {
    var req = new XMLHttpRequest();
    req.open("POST",dbURL);
    const newtask = {
      taskName : textInput,
      username : "plj1280",
      targetTime : 0
    }
    req.onload = function() {
      var task = JSON.parse(this.responseText,strToNum)
      setTextInput("");
      setTasks([...tasks,
        {...task,
          onClickDeleteTask : onClickDeleteTaskGen(task),
          onClickSetActive : onClickSetActiveGen(task)
        }
      ])
    }
  req.send(JSON.stringify({method:"POST",item:newtask}));
  }


  function onClickDeleteTaskGen(task) {
    return () => {
      setTasks(ptasks=>ptasks.filter(ptask=>(ptask.creationTime!==task.creationTime)))
      var delreq = new XMLHttpRequest()
      delreq.open("POST",dbURL)
      delreq.send(JSON.stringify({method : "DELETE", item : task}))
    }
  }

  function onClickSetActiveGen(task) {
    return () => {
      setTasks(ptasks=>ptasks.map(ptask=>(ptask.creationTime===task.creationTime ? {
        ...ptask,
        active : !ptask.active,
        startTime : ptask.active ? ptask.startTime : new Date().getTime(),
        elapsedTime : ptask.active ? ptask.progress : ptask.elapsedTime
      } : {
        ...ptask, active : false, elapsedTime : ptask.active ? ptask.progress : ptask.elapsedTime
      }
      )))
    }
  }

  useEffect(function () {
    var req = new XMLHttpRequest();
    req.open("GET",dbURL);
    req.onload = function () {
      var dbTasks = JSON.parse(this.responseText,strToNum)
      setTasks(dbTasks.map(function (item) {
        return {
          ...item,
          onClickDeleteTask : onClickDeleteTaskGen(item),
          onClickSetActive : onClickSetActiveGen(item)
        }
      }))
    }
    req.send()
  }, [])



  useEffect(()=>setInterval(()=>{
    setTasks(ptasks=>ptasks.map((task)=>{
    //task.active ? {...task, progress : task.savedProgress + ((new Date().getTime())-task.startTime)/100} : task
      return task.active ? {...task, progress:task.elapsedTime+(new Date().getTime()-task.startTime)/100} : task
    }))}, 100),[])


  return (
    <div className="App">
      Hello.
      {tasks.map((task)=> <Task task={task} key={task.creationTime}></Task>)}
          New task
          <input type="text" value={textInput} onChange={(event)=>setTextInput(event.target.value)}/>
      <button onClick={onClickCreateTask}>New task</button>
    </div>
    
  );
}

export default App;
