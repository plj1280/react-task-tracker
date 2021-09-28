function ProgressBar(props) {

    const outerStyle = {
        height : "50px",
        width : "400px",
        backgroundColor : "#bbb"
    }

    const innerStyle = {
        padding : "0",
        margin : "0",
        width : props.progress+"%",
        height : "100%",
        backgroundColor : "#339933"
    }

    return (
        <div style={outerStyle}>
            <div style={innerStyle}></div>
        </div>
    )
}

export default ProgressBar