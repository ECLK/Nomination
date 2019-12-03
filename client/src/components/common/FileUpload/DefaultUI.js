import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import DoneOutline from '@material-ui/icons/DoneOutline';
import PropTypes from "prop-types";
import AttachIcon from '@material-ui/icons/AttachFile';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const defaultStyles = {
  border: "#ccc",
  textAlign: "center",
  padding: "10px",
  height: "50px",
  width: "10px",
};

const statusTargetedStyles = {
  ready: {
    backgroundColor: "#a80b71"
  },
  dragenter: {
    backgroundColor: "#eee"
  },
  dragover: {
    backgroundColor: "#f5f5f5"
  },
  drop: {
    backgroundColor: "#ccc"
  }
};

const showFlagToStyle = (flag) => (
  {display: flag ? "" : "none"}
);

const DefaultUI = ({status, progress}) => {
  const uploading = status === "uploading";
        
  // return <AttachIcon style={{...defaultStyles, ...statusTargetedStyles[status]}}>
  return <Button variant="contained" color="default" style={{margin: 1}}>Attach<CloudUploadIcon style={{marginLeft: 1}} />

    <p style={showFlagToStyle(status === "ready")}>
      {/* Drag and drop an image file here or click. */}
    </p>
    <div style={showFlagToStyle(status === "uploaded")}>
      <DoneOutline color="secondary"/>
      <a download={"filename"} href={"ok"}>filename</a>
    </div>
    <p style={showFlagToStyle(uploading)}> Uploading... </p>
    {uploading && <LinearProgress variant="determinate" value={progress}/> }
    </Button>
};

DefaultUI.propTypes = {
  status: PropTypes.string.isRequired
};

export default DefaultUI;
