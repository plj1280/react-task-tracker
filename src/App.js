import Task from './Task'
import ProgressBar from "./ProgressBar"
import {useState, useEffect} from 'react'

function App() {

  const [tasks, setTasks] = useState([]);
/*   const [tasks, setTasks] = useState([{
    description : "Learn React!",
    progress : 0,
    active : true,
    startTime : new Date().getTime()
  }]) */
  const [nTasks, setNTasks] = useState(0);
  const [textInput, setTextInput] = useState("");

  const onClickCreateTask = () => {
    var req = new XMLHttpRequest();
    req.open("GET","https://u34x82trhl.execute-api.us-east-2.amazonaws.com/Prod/tasks");
    req.onload = function() {
      var response = JSON.parse(this.responseText);
      console.log(response);

      setTextInput("");
      setTasks(
      [...tasks, 
      {
      description : response.Item.taskName.S,
      progress : 0,
      active : false,
      startTime : 0,
      savedProgress : 0,
      onClickSetActive : ()=>{
        setTasks(ptasks=>ptasks.map((task,i)=>((i===(tasks.length)) ? {
          ...task, active:!(task.active),
          startTime : !(task.active) ? (new Date().getTime()) : null,
          savedProgress : task.active ? task.progress : task.savedProgress
        } : {...task, active:false, savedProgress:task.progress}
        )))

      }
      }])}
  req.send();
  };

    useEffect(()=>setInterval(()=>setTasks(ptasks=>ptasks.map((task)=>(
      task.active ? {...task, progress : task.savedProgress + ((new Date().getTime())-task.startTime)/100} : task
    )
      )), 100),[])



  return (
    <div className="App">
      Hello.
      {tasks.map((task)=> <Task task={task}></Task>)}
          New task
          <input type="text" value={textInput} onChange={(event)=>setTextInput(event.target.value)}/>
      <button onClick={onClickCreateTask}>New task</button>
    </div>
    
  );
}

export default App;
