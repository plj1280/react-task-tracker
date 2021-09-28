import ProgressBar from "./ProgressBar";

function Task(props) {

    const buttonStyle = {
        width : "5em",
        height : "2em",
        backgroundColor : props.task.active ? "#2277bb" : "#bb7722"
    }

    return (
        <div>
            Task: {props.task.description}
            <button className='playButton' style={buttonStyle} onClick={props.task.onClickSetActive}>Start</button>
            <ProgressBar progress={props.task.progress}></ProgressBar>
        </div>
    );
}

export default Task;