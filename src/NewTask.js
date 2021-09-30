import {useState} from 'react'

function NewTask(props) {
    const [modalOn, setModalOn] = useState(false)
    const [taskName, setTaskName] = useState("")
    const [blockLength, setBlockLength] = useState(1)
    const [numBlocks, setNumBlocks] = useState(1)
    
    function Modal() {
        const divStyle = {
            display : "block",
            position : "fixed",
    
        }

        function onClickCreateTask(event) {
            const newtask = {
                taskName : taskName,
                username : props.username,
                blockLength : blockLength,
                numBlocks : numBlocks
            }
            props.onClickCreateTask(newtask)
            event.preventDefault()
        }

        return(
            <div style={divStyle} onClick={()=>{
                setModalOn(true)
            }}>
                <form onSubmit={onClickCreateTask}>
                    <label>Task name</label>
                    <input type="text" value={taskName} onChange={(event)=>setTaskName(event.target.value)}></input>
                    <label>Block length</label>
                    <input type="text" value={blockLength} onChange={(event)=>setBlockLength(event.target.value)}></input>
                    <label>Number of blocks</label>
                    <input type="text" value={numBlocks} onChange={(event)=>setNumBlocks(event.target.value)}></input>
                    <input type="submit" value="Create Task"></input>
                </form>
            </div>
        )
    }
    
    function Button(props) {
        return(
            <button onClick={()=>{
                setModalOn(true)
            }}>New Task</button>
        )
    }
    
    return(
        <div>
            {modalOn ? Modal() : Button()}
        </div>
    )
}

export default NewTask