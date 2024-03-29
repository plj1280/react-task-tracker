import Task from './Task'
import Login from './Login'
import NewTask from './NewTask'
import {useState, useEffect} from 'react'

function App() {

  const dbURL = "https://u34x82trhl.execute-api.us-east-2.amazonaws.com/Prod/tasks"
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("")
  const [loggedin, setLoggedin] = useState(false)

  function strToNum(key,val) {
    const num = Number(val)
    return isNaN(num) ? val : num
  }

  const onClickCreateTask = (newtask) => {
    var req = new XMLHttpRequest();
    req.open("POST",dbURL);
    req.onload = function() {
      var task = JSON.parse(this.responseText,strToNum)
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
      if(this.status===200) {
        var dbTasks = JSON.parse(this.responseText,strToNum)
        if(dbTasks.length){
          setTasks(dbTasks.map(function (item) {
            return {
              ...item,
              onClickDeleteTask : onClickDeleteTaskGen(item),
              onClickSetActive : onClickSetActiveGen(item)
            }
          }))
        }
        else{setTasks([])}
      }
      else{setTasks([])}
    }
    req.setRequestHeader("username",username)
    req.send()
  }, [username])


  useEffect(()=>setInterval(()=>{
    setTasks(ptasks=>ptasks.map((task)=>{
      return task.active ? {...task, progress:task.elapsedTime+(new Date().getTime()-task.startTime)/100} : task
    }))}, 100),[])


  return (
    <div className="App">
      <Login username={username} loggedin={loggedin}
      setUsername={setUsername}
      setLoggedin={setLoggedin}
      ></Login>
      {tasks.map((task)=> <Task task={task} key={task.creationTime}></Task>)}
      <NewTask username={username} onClickCreateTask={onClickCreateTask}></NewTask>
    </div>
    
  );
}

export default App;
