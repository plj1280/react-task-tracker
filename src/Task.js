import ProgressBar from "./ProgressBar";

function Task(props) {

    const buttonStyle = {
        width : "5em",
        height : "2em",
        backgroundColor : props.task.active ? "#2277bb" : "#bb7722"
    }
    const delButtonStyle = {
        width : "5em",
        height : "2em",
    }

    return (
        <div>
            Task: {props.task.taskName}
            <button className='playButton' style={buttonStyle} onClick={props.task.onClickSetActive}>Start</button>
            <button style={delButtonStyle} onClick={props.task.onClickDeleteTask}>Delete</button>
            <ProgressBar progress={props.task.progress}></ProgressBar>
        </div>
    );
}

export default Task;